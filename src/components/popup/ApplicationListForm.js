import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
import Widget from "components/Widget";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { numberWithCommas } from 'util/functions.js';
import InfiniteScroll from 'react-infinite-scroller';
import moment from "moment";

import AdminJobListApplicationFilter from 'components/popup/AdminJobListApplicationFilter';
import TrueFalseIcon from 'components/TrueFalseIcon';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class ApplicationListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application_list: [],

      hasMore: true,
      noRecordFound: false,
  	  pageSize: 20,
  	  pageNum: 1,
  	  pageReady: false,
  	  activeCandidate: null,
  	  //for filter
  	  similarity: { min: 0, max: 100 },
  	  experience: { min: 0, max: 50 },
      recommendedCandidate: false,
      appStateList: [],
      searchText: "",
      //checkedItemsAppStat: new Map(),
      appStateSelected : [],
    }
  }
  
  componentDidMount() {
    this.state.pageReady = true;
    this.getMoreCandidate();
    this.initData();
  }
  
  initData = async () => {

    var applicationStateList = [];
    const appStatResult = await axios.get('/api/admins/get/application/state/list'); //For React-Select
    if(appStatResult.data.isSuccess)
    {
      applicationStateList = appStatResult.data.applicationState_list;
      this.setState({appStateList : appStatResult.data.applicationState_list});
    }
 }
  
  getMoreCandidate = () => {
    if(this.state.pageReady && this.props.jobId && this.state.hasMore)
    {
       var appStat = ""
      this.state.appStateSelected.forEach(function(object) {
        if(object.value)
          appStat += object.value + ",";
      });
      
      if(appStat.length>0)
        appStat = appStat.substr(0, appStat.length-1); 
      axios.post('/api/clients/get/application/list',{
        jobId: this.props.jobId,
        pageNum: this.state.pageNum,
        recordNum: this.state.recordNum,
        //new
        searchData: this.state.searchText,
        minSimilarity: this.state.similarity.min,
        maxSimilarity: this.state.similarity.max,
        minExperience: this.state.experience.min,
        maxExperience: this.state.experience.max,
        appStat: appStat,
        recommendedCandidate: this.state.recommendedCandidate,
      }) 
        .then(res => {
          if (res.data.isSuccess) {
            this.setState({
                application_list:  this.state.application_list.concat(res.data.app_list),
                hasMore: (res.data.hasMore == true)? true : false,
                pageNum: this.state.pageNum + 1
            });
 
            //if records are not returned
            if(!this.state.lastUserId)
            {
                 this.setState({ noRecordFound:true });
            }
          } 
          else {
            this.setState({
                hasMore: false,
            });
          }
        })
        .catch(function (err) {
          //console.log(err);
        });   
      
    }
  }
  closeForm = () => {
    this.props.closeModal('applicationListOpen');
    this.resetForm();
  }
  
  resetForm = () => {
    this.setState({
      application_list: [],
      activeCandidate: "",
      hasMore: true,
      noRecordFound: false,
  	  pageNum : 1
    })
  }
  
  viewApplcation = (application) => {
    var applicationId = (application != null) ? application : "";
    if(applicationId)
      window.open("/application/"+applicationId, "_blank");
    else
      alert("Application data error!");
  }
  
  viewProfile = (application) => {
    if (this.props.userType=="admin") {
      window.open("/resume/"+application.candidate._id._id, "_blank");
    }
    else {
      var applicationId = (application != null) ? application : "";
      if(applicationId)
        window.open("/resume/"+applicationId, "_blank");
      else
        alert("Candidate data error!");
    }
  }
  
  updateCheckList = (list, key) => {
   var gotList = this.state[list];
   if(gotList)
   {
      if(gotList.has(key))
        gotList.set(key,!gotList.get(key));
      else
         gotList.set(key,true);
         
      this.setState({
         [list] : gotList
      })
   }
 }
 
 
 searchApplication = (e) => {
   this.resetForm();
   this.closeModal('showFilterPopup');
   this.getMoreCandidate();

  }
  
  handlePropChange = (key) => {
   var prop = this.state[key];
    this.setState({
       [key] : !prop
    })
 }
 
 inputRangeChanged = (name, value) => {
    this.setState({
      [name]: value
    });
  }
  
  clearFilter = () => {
  
    this.setState({
      //checkedItemsAppStat: new Map(),
      industrySelected : [],
      appStateSelected : [],
      similarity: { min: 0, max: 100 },
      experience: { min: 0, max: 50 },
      searchText : "",
      recommendedCandidate: false
    });
  }
  
  selectSearchText(text, name){
     this.setState({
      [name]: text,
    });
  }
  
  updateSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
  }
  
  autocompleteChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  openModal = (e) => {
    e.preventDefault();
    this.setState({showFilterPopup: true});
  }
  
  closeModal = (name) => {
    this.setState({ [name]: false });
  }
 
  render() {
    const { userType } = this.props;
    const { isOpen } = this.props;
    
    const loaderComponent = <div className="loader" key={0} style={{padding: "30px 0px"}}>Loading ...</div>;
    
    var items = [];
    this.state.application_list.map((application, i) => {
      items.push(
                  <StyledTableRow key='1'>
                    <StyledTableCell align="center">{application && application.updatedAt ?  moment(application.updatedAt).format("YYYY/MM/DD") :""}</StyledTableCell>
                    <StyledTableCell align="center"><a target='_blank' href={"/resume/"+ (userType=="admin" ? application.candidate._id._id : application._id)}>{application && application.candidate && application.candidate._id && application.candidate._id.name ? 
                      application.candidate._id.name.firstName + " " + application.candidate._id.name.lastName
                     :""}</a>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {application && application.candidate && application.candidate.salary ? "$"+numberWithCommas(application.candidate.salary) :""}<br/>
                      {application && application.candidate && application.candidate.experience ? application.candidate.experience+" Yr" :""}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {application.sim && application.sim.score ? Math.round(application.sim.score*100)+'%' : '0%'}
                    </StyledTableCell>
                    <StyledTableCell align="center">{application && application.state ? application.state : ""}</StyledTableCell>
                    <StyledTableCell align="center">{application && <TrueFalseIcon checker={application.referral} /> }</StyledTableCell>
                    <StyledTableCell align="center">{application && <TrueFalseIcon checker={application.isCvSent} /> }
                    </StyledTableCell>
                    {/*<StyledTableCell align="center">
                      <Button variant="contained" className="jr-btn jr-btn-lg bg-white"
                        onClick={() => this.viewProfile(application && application._id ? application._id : "")}>
                          View
                      </Button>
                    </StyledTableCell>*/}
                    <StyledTableCell align="center">
                      <Button variant="contained" className="jr-btn jr-btn-lg bg-white"
                        onClick={() => this.viewApplcation(application && application._id ? application._id : "")}>
                          View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
      )
    });
    
    return (
      <Dialog open={isOpen} onClose={()=>this.closeForm()} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
        <DialogContent id="application-list">  
          <div className="mb-3">
            <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Application List <span className="close-popup" onClick={()=>this.closeForm()}><i className="la la-close"></i></span></h3>
          </div>
          
          <Dialog open={this.state.showFilterPopup} onClose={() => this.closeModal('showFilterPopup')} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
              <DialogContent id="popup-filter" style={{ width: "400px" }}>  
                  <div className="mb-3">
                    <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Filter <span className="close-popup" onClick={() => this.closeModal('showFilterPopup')}><i className="la la-close"></i></span></h3>
                  </div>
                  <AdminJobListApplicationFilter 
                          //industrySelected={this.state.industrySelected}
                          appStateSelected={this.state.appStateSelected}
                          similarity={this.state.similarity} 
                          experience={this.state.experience}
                          recommendedCandidate={this.state.recommendedCandidate}
                          //activeJob={this.state.activeJob}
                          appStateList={this.state.appStateList}
                          handleCheckBoxChange={this.updateCheckList.bind(this)}
                          search={this.searchApplication.bind(this)}
                          handlePropChange={this.handlePropChange.bind(this)}
                          onFieldChanged={this.inputRangeChanged.bind(this)}
                          clearFilter={this.clearFilter.bind(this)}
                          updateSearchText={this.updateSearchText.bind(this)}
                          selectSearchText={this.selectSearchText.bind(this)}
                          searchText={this.state.searchText}
                          autocompleteChange={this.autocompleteChange.bind(this)}
                  />
            </DialogContent>
          </Dialog>
          <div className="col-xl-4 col-lg-4 col-md-4 col-4 mb-4">
                <Button variant="contained" color="primary" className="jr-btn"
                      onClick={(e) => this.openModal(e)}>
                  <font size="+1">Filter</font>
                </Button>
          </div>  
          
          
          <div className="account-popup-area signup-popup-box">
        	  <div className="referral-popup">
          	  <div className="row justify-content-left">
                <div id="inif-container-popup" className="table-container admin-infinite-popup-table">
                  <Table stickyHeader aria-label="sticky customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Update Date</StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Current Salary<br/>Experience</StyledTableCell>
                          <StyledTableCell align="center">Matching Score</StyledTableCell>
                          <StyledTableCell align="center">Application Status</StyledTableCell>
                          <StyledTableCell align="center">Refer</StyledTableCell>
                          <StyledTableCell align="center">Sent CV to Client</StyledTableCell>
                          {/*<StyledTableCell align="center">Applicant Profile</StyledTableCell>*/}
                          <StyledTableCell align="center">Application Details</StyledTableCell>
                        </TableRow>
                      </TableHead>
                    
                        <InfiniteScroll
                              className="MuiTableBody-root"
                              pageStart={0}
                              element={'tbody'}
                              loadMore={this.getMoreCandidate.bind(this)}
                              hasMore={this.state.hasMore}
                              loader={loaderComponent}
                              useWindow={false}
                              getScrollParent={() => document.getElementById('inif-container-popup')}
                            >
                              {items}
                        </InfiniteScroll>
                      {/*
                          <StyledTableRow key='1'>
                            <StyledTableCell align="center">{this.state.candidate !=null ? 
                              (this.state.candidate.name ? this.state.candidate.name.lastName + " " + this.state.candidate.name.firstName
                              :"")
                             :""}
                            </StyledTableCell>
                            <StyledTableCell align="center">{this.state.candidate !=null ? this.state.candidate.email :""}</StyledTableCell>
                            <StyledTableCell align="center">{this.state.candidate !=null ? 
                              (this.state.candidate.phone ? this.state.candidate.phone.dial + " " + this.state.candidate.phone.number 
                              :"")
                             :""}</StyledTableCell>
                            <StyledTableCell align="center">
                            { this.state.candidate !=null ?
                              <Button variant="contained" color="primary" className="jr-btn" onClick={() => this.viewProfile()}>
                                  View Details
                              </Button>
                              : ""
                            }
                            </StyledTableCell>
                            <StyledTableCell align="center">
                            { this.state.candidate !=null ?
                              <Button variant="contained" color="primary" className="jr-btn" onClick={(e) => this.recommendJob(e)}>
                                  Refer
                              </Button>
                              : ""
                            }
                            </StyledTableCell>
                          </StyledTableRow>
                      */}
        
                  
                    </Table>
                  </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
     
    );
  }
}

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default connect(mapStateToProps, null)(ApplicationListForm);
