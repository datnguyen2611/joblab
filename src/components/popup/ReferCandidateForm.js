import React, { Component } from 'react';
import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
import Widget from "components/Widget";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { store } from 'react-notifications-component';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

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

const dialog = withStyles(theme => ({
  scrollBody: {
       minWidth:'70%'
    }
}))(Dialog);

  

class ReferCandidateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate_list: [],
      candidate: null,
      
      hasMore: true,
  	  pageSize: 999999,
  	  candidateList: [],
  	  searchText: "",
      salary: { min: 0, max: 2000000 },
      experience: { min: 0, max: 100 },
  	  lastUserId: null,
  	  noRecordFound: false,
  	  pageReady: false,
  	  checkedItemsIndustry: new Map(),
  	  activeCandidate: false,
      myCandidate: false,
      
      email: '',
      isLoading: false,
    }
  }
  
  componentDidMount() {
     this.state.pageReady = true;
     this.getMoreCandidate();
  }
  
  getMoreCandidate = () => {
    if(this.state.pageReady)
    {
      var industry = "";

      this.state.checkedItemsIndustry.forEach(function(value, key) {
        if(value)
          industry += key + ",";
      });
      if(industry.length>0)
       industry = industry.substr(0, industry.length-1); 
       
      axios.post('/api/admins/get/candidate/list/more' , {
        lastUserId: this.state.lastUserId,
        recordPerReq: this.state.pageSize,
        searchData: this.state.searchText,
        searchCountryId: this.state.location ? this.state.location.value : "default",
        searchIndustryId: industry,
        minSalary: this.state.salary.min,
        maxSalary: this.state.salary.max,
        minExperience: this.state.experience.min,
        maxExperience: this.state.experience.max,
        activeCandidate: this.state.activeCandidate,
        myCandidate: this.state.myCandidate,
        //jobType: jobType
      }) 
        .then(res => {
          if (res.data.isSuccess) {
            this.setState({
                candidate_list:  this.state.candidate_list.concat(res.data.candidateList),
                hasMore: (res.data.hasMore == true)? true : false,
                lastUserId: (res.data.candidateList.length > 0) ? res.data.candidateList[res.data.candidateList.length-1]._id: this.state.lastUserId,
            });
 
            //if records are not returned
            if(!this.state.lastUserId)
            {
                 this.setState({ noRecordFound:true });
            }
          }
        })
        .catch(function (err) {
          //console.log(err);
        });   
    }
  }
  
  textboxChange = (e) => {
    if(e.target.name)
      this.setState({ [e.target.name]: e.target.value });
  }
  
  autocompleteChange = (e, value, name) => {
    //console.log(this.state.candidate);
    this.setState({ [name]: value });
  }
  
  resetForm = () => {
    this.setState({
      candidate: null
    })
    
    this.props.closeModal('referCandidateOpen');
  }
  
  recommendJob = (e) => {
    e.preventDefault();
    
    if (this.state.candidate==null && this.state.job==null) {
        store.addNotification({
          title: "Warning!",
          message: "Please select candidate for recommendation",
          type: "warning",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            //onScreen: true
          }
        });
      //alert("Please select job for recommendation")
    }
    else {
      const data = {
        candId: this.state.candidate._id ? this.state.candidate._id : "",
        jobId: this.props.jobId ? this.props.jobId : "",
      }
      //console.log(data)
      
      axios.post('/api/admins/set/job/recommend', data)
      .then(res => {
        if (res.data.isSuccess) {
          store.addNotification({
              title: "Success",
              message: "The job has been recommended to candidate.",
              type: "success",
              insert: "top",
              container: "bottom-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                //onScreen: true
              }
          });
       
          //alert('The job has been recommended to candidate.');
        }
        else {
          store.addNotification({
              title: "Warning!",
              message: res.data.msg,
              type: "warning",
              insert: "top",
              container: "bottom-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                //onScreen: true
              }
          });
          //alert(res.data.msg);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
  
  recommendJobByEmail = () => {
    const data = {
      email: this.state.email,
      jobId: this.props.jobId ? this.props.jobId : "",
    }
    
    axios.post('/api/jobs/set/job/recommend', data)
    .then(res => {
      if (res.data.isSuccess) {
        store.addNotification({
            title: "Success",
            message: "The job has been recommended to candidate.",
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              //onScreen: true
            }
        });
     
        //alert('The job has been recommended to candidate.');
      }
      else {
        store.addNotification({
            title: "Warning!",
            message: res.data.msg,
            type: "warning",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              //onScreen: true
            }
        });
        //alert(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  /*viewProfile = () => {
    var candId = (this.state.candidate != null) ? this.state.candidate._id : "";
    if(candId)
      window.open("/resume/"+candId, "_blank");
    else
      alert("Candidate data error!");
  }*/
  
  render() {
    const { isOpen } = this.props;
    
    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      stringify: option => ((option.userInfo && option.userInfo.name ? option.userInfo.name.firstName : "") 
                            + " " + 
                            (option.userInfo && option.userInfo.name ? option.userInfo.name.lastName : "")),
    });

    var userInfo = (this.state.candidate && this.state.candidate.userInfo) ? this.state.candidate.userInfo : null;
    var userId = this.state.candidate ? this.state.candidate._id : null;
    return (
      <Dialog open={isOpen} onClose={()=>this.resetForm()} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
        <DialogContent id="application-list">  
          <div className="mb-3">
            <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Candidate List <span className="close-popup" onClick={()=>this.resetForm()}><i className="la la-close"></i></span></h3>
          </div>
          <div className="account-popup-area signup-popup-box">
        	<div className="referral-popup">
          	  <div className="row justify-content-left">
        	      <div className="col-md-6 mb-md-4">
                  <Autocomplete
                      value={this.state.candidate}
                      options={this.state.candidate_list}
                      getOptionLabel={option => ((option.userInfo && option.userInfo.name ? option.userInfo.name.firstName : "") 
                                                + " " + 
                                                (option.userInfo && option.userInfo.name ? option.userInfo.name.lastName : ""))}
                      filterOptions={filterOptions}
                      id="candidate"
                      renderInput={params => (
                        <TextField {...params} label="Candidate" fullWidth />
                      )}
                      onChange={(e, value) => this.autocompleteChange(e, value, 'candidate')}
                  />
                </div>
                <div className="col-md-12 mb-md-12 table-container">
                  <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">Phone</StyledTableCell>
                          {/*<StyledTableCell align="center">Candidate Profile</StyledTableCell>*/}
                          <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      { userInfo && 
                          <StyledTableRow key='1'>
                            <StyledTableCell align="center">
                              <a href={"/resume/"+userId} target="_blank">
                                {userInfo !=null ? 
                                (userInfo && userInfo.name ? 
                                    (userInfo.name.firstName|| "") + " " + (userInfo.name.lastName|| "")
                                :"")
                               :""}
                              </a>
                            </StyledTableCell>
                            <StyledTableCell align="center">{userInfo !=null ? userInfo.email :""}</StyledTableCell>
                            <StyledTableCell align="center">{userInfo !=null ? 
                              (userInfo.phone ? (userInfo.phone.dial|| "") + " " + (userInfo.phone.number|| "")
                              :"")
                             :""}</StyledTableCell>
                            {/*<StyledTableCell align="center">
                            { this.state.candidate !=null ?
                              <Button variant="contained" color="primary" className="jr-btn" onClick={() => this.viewProfile()}>
                                  View Details
                              </Button>
                              : ""
                            }
                            </StyledTableCell>*/}
                            <StyledTableCell align="center">
                            { userInfo !=null ?
                              <Button variant="contained" color="primary" className="jr-btn" onClick={(e) => this.recommendJob(e)}>
                                  Refer
                              </Button>
                              : ""
                            }
                            </StyledTableCell>
                          </StyledTableRow>
                      }
        
                      </TableBody>
                    </Table>
                  </div>
                  <div className="extra-login">
      			        <span className="or">OR</span>
      			      </div>
                <div className="col-md-6 mb-md-4">
    			        <h3>Recommend to Non-User</h3>
                    <TextField
                      type="text"
                      name="email"
                      placeholder="example@jobslab.io"
                      id="email"
                      label="Email"
                      fullWidth
                      margin="normal"
                      onChange={this.textboxChange}
                      value={this.state.email}
                    />
                    <Button variant="contained" color="primary" className="btn btn-primary" disabled={this.state.isLoading} onClick={this.recommendJobByEmail}>
                      {this.state.isLoading && <i className='fa fa-spinner fa-spin' />} Send
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
    );
  }
}

export default ReferCandidateForm;
