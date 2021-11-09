import React, { Component } from 'react';
import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
import Widget from "components/Widget";
import TrueFalseIcon from 'components/TrueFalseIcon';

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

class CandidateApplicationListForm extends Component {
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
    }
  }
  
  componentDidMount() {
     this.state.pageReady = true;
     this.getMoreCandidateApplication();
  }
  
  getMoreCandidateApplication = () => {
    if(this.state.pageReady && this.props.candidateId)
    {
      axios.post('/api/admins/get/candidate/application/list',{
        candidateId: this.props.candidateId,
        pageNum: this.state.pageNum,
        recordNum: this.state.recordNum
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
        })
        .catch(function (err) {
          //console.log(err);
        });   
      
    }
  }
  resetForm = () => {
    this.props.closeModal('applicationListOpen');
    
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
    var applicationId = (application != null) ? application : "";
    if(applicationId)
      window.open("/resume/"+applicationId, "_blank");
    else
      alert("Candidate data error!");
  }
  
  render() {
    const { isOpen } = this.props;
    
    const loaderComponent = <div className="loader" key={0} style={{padding: "30px 0px"}}>Loading ...</div>;
    
    var items = [];
    this.state.application_list.map((application, i) => {
      items.push(
                  <StyledTableRow key='1'>
                    <StyledTableCell align="center">{application && application.updatedAt ?  moment(application.updatedAt).format("YYYY/MM/DD") :""}</StyledTableCell>
                    <StyledTableCell align="center">
                      <a target='_blank' href={"/job/"+application.job._id}>{ application && application.job && application.job.jobTitle ? application.job.jobTitle : ""}</a><br/>
                      ({application && application.job && application.job.company ? application.job.company :""})
                    </StyledTableCell>
                    {/*<StyledTableCell align="center">{application && application.job && application.job.company ? application.job.company :""}</StyledTableCell>*/}
                    <StyledTableCell align="center">
                      {application && application.job && application.job.salaryMax ? "$"+numberWithCommas(application.job.salaryMax) :""}<br/>
                      {application && application.job && application.job.yearMin ? application.job.yearMin+" Yr" :""}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {application.sim && application.sim.length > 0 ? Math.round(application.sim[0].score*100)+'%' : '0%'}
                    </StyledTableCell>
                    <StyledTableCell align="center">{application && application.state ? application.state : ""}</StyledTableCell>
                    <StyledTableCell align="center">{application && <TrueFalseIcon checker={application.isReferral} />/*application.referral ? "Yes" : "No"*/}</StyledTableCell>
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
      <Dialog open={isOpen} onClose={()=>this.resetForm()} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
        <DialogContent id="application-list">  
            <div className="mb-3">
              <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Application List <span className="close-popup" onClick={()=>this.resetForm()}><i className="la la-close"></i></span></h3>
            </div>
            <div className="account-popup-area signup-popup-box">
        	    <div className="referral-popup">
          	    <div className="row justify-content-left">
                  <div id="inif-container-popup" className="table-container admin-infinite-popup-table">
                    <Table stickyHeader aria-label="sticky customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Update Date</StyledTableCell>
                          <StyledTableCell align="center">Applied Job<br/>(Company)</StyledTableCell>
                          {/*<StyledTableCell align="center">Company</StyledTableCell>*/}
                          <StyledTableCell align="center">Salary (Max)<br/>Experience (Min)</StyledTableCell>
                          <StyledTableCell align="center">Matching Score</StyledTableCell>
                          <StyledTableCell align="center">Application Status</StyledTableCell>
                          <StyledTableCell align="center">Refer</StyledTableCell>
                          {/*<StyledTableCell align="center">Applicant Profile</StyledTableCell>*/}
                          <StyledTableCell align="center">Application Details</StyledTableCell>
                        </TableRow>
                      </TableHead>
                    
                      <InfiniteScroll
                            className="MuiTableBody-root"
                            pageStart={0}
                            element={'tbody'}
                            loadMore={this.getMoreCandidateApplication.bind(this)}
                            hasMore={this.state.hasMore}
                            loader={loaderComponent}
                            useWindow={false}
                            getScrollParent={() => document.getElementById('inif-container-popup')}
                          >
                            {items}
                      </InfiniteScroll>
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

export default CandidateApplicationListForm;
