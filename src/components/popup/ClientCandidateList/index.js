import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
import Widget from "components/Widget";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { numberWithCommas } from 'util/functions.js';

import moment from "moment";

import ClientApplicantList from 'components/ClientApplicantList';

import CandidateListCard from 'components/popup/Client/CandidateListCard';

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


class ClientCandidateList extends Component {
     constructor(props) {
      super(props);
      this.state = {
        application_list: [],
        loader: true,
        
        hasMore: true,
        noRecordFound: false,
    	  pageSize: 20,
    	  pageNum: 1,
    	  pageReady: false,
    	  activeCandidate: null,
    	  activeJob: this.props.jobId,
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
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeJob !== this.state.activeJob) {
      this.setState({
        activeJob : this.state.activeJob
      });
      if(this.state.activeJob) {
        this.getMoreCandidate(); 
      }
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.jobId!==prevState.activeJob){
      return {activeJob : nextProps.jobId};
    }
    else return null;
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
        pageNum: 0,//this.state.pageNum,
        recordNum: 99999,//this.state.recordNum,
        //new
        //searchData: this.state.searchText,
        //minSimilarity: this.state.similarity.min,
        //maxSimilarity: this.state.similarity.max,
        //minExperience: this.state.experience.min,
        //maxExperience: this.state.experience.max,
        //appStat: appStat,
        //recommendedCandidate: this.state.recommendedCandidate,
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
          this.setState({ loader: false });
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
  	  pageNum : 1,
  	  loader: true
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
    const { userType, isOpen } = this.props;
    const { loader } = this.state;

    /*var items = [];
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
                    </StyledTableCell>*
                    <StyledTableCell align="center">
                      <Button variant="contained" className="jr-btn jr-btn-lg bg-white"
                        onClick={() => this.viewApplcation(application && application._id ? application._id : "")}>
                          View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
      )
    });*/
    
    return (
        <Dialog open={isOpen} onClose={()=>this.closeForm()} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
          <DialogContent className="candidate-popup-content" id="application-list">  
            <div className="mb-3">
              <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Candidate List <span className="close-popup" onClick={()=>this.closeForm()}><i className="la la-close"></i></span></h3>
            </div>
            {/*<div className="col-xl-4 col-lg-4 col-md-4 col-4 mb-4">
                  <Button variant="contained" color="primary" className="jr-btn"
                        onClick={(e) => this.openModal(e)}>
                    <font size="+1">Filter</font>
                  </Button>
            </div>  */}
            
            {loader ?
              <div className="loader-view"
                   style={{height: 'calc(20vh)', width: 'calc(35vw)'}}>
                <CircularProgress/>
              </div> : 
                <CandidateListCard
                  hasMore={this.state.hasMore}  
                  loadAllMore={this.getMoreCandidate.bind(this)}  
                  applicantList={this.state.application_list} />
              //another view
              /*<ClientApplicantList applicantList={this.state.application_list} />*/
            }
          </DialogContent>
        </Dialog>
    );
  }
}

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default connect(mapStateToProps, null)(ClientCandidateList);