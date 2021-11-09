import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
//import Modal from 'react-modal';
//import modalStyle from 'styles/modalStyle';
import Widget from "components/Widget";
import { DateTimePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as notification from 'actions/Notification';

class InterviewScheduleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      //startTime: null,
      selectedDate: null,//new Date(),
      hours: null,
      minutes: null,
      venue: '',
      detail: '',
    };
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  /*datePickerChange = (date, key) => {
    this.setState({ [key]: date });
  }*/
  
  handleDateChange = (date) => {
    this.setState({selectedDate: date});
  };
  
  autocompleteChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  /*handleNumericChange = (val, name) => {
    this.setState({ [name]: val });
  }*/
  
  interviewSchedule = () => {
    const data = {
      appId: this.props.appId,
      dateTime: this.state.selectedDate,
      timeZone: moment.tz.guess(true),
      hours: this.state.hours,
      minutes: this.state.minutes,
      venue: this.state.venue,
      detail: this.state.detail,
    };
    console.log(this.props.isConfirmed);
    var apiUrl = this.props.isConfirmed ? '/api/admins/set/interview/schedule' : '/api/clients/set/interview/request';
    axios.post(apiUrl, data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have successfully scheduled an interview for this application.");
        this.props.completeSchedule();
      }
      else {
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  render() {
    const { isOpen, closeModal } = this.props;
    const { selectedDate, hours, minutes, venue, detail } = this.state;

    return (
      <Dialog open={isOpen} onClose={() => closeModal('interviewModalIsOpen')} scroll={'body'} /*maxWidth="md"*/ aria-labelledby="form-dialog-title">
      {/*<Modal
        isOpen={isOpen}
        onRequestClose={() => closeModal('interviewModalIsOpen')}
        style={modalStyle.jobContentModalStyle}
        contentLabel=""
      >
      <Widget styleName="jr-card-profile">
        <div className="account-popup-area signup-popup-box">
        	<div className="referral-popup">*/}
        	  <DialogTitle id="form-dialog-title">Interview Schedule</DialogTitle>
        	  <DialogContent>
          	  <div className="row justify-content-left">
          	    {/*<span className="pf-title">Select Candidate</span>*/}
          	    <div key="datetime_custom" className="col-lg-6 col-md-12 col-sm-12">
                  <DateTimePicker
                    fullWidth
                    //autoOk
                    showTabs={false}
                    autoSubmit={false}
                    //disableFuture
                    //variant="inline"
                    label="Start Date and Time"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    error={!selectedDate}
                    helperText={!selectedDate && "Required"}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <i className="zmdi zmdi-alarm"/>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <Autocomplete
                    value={hours}
                    options={["0","1","2","3","4","5","6","7","8","9","10","11","12"]} 
                    autoHighlight={true}
                    renderInput={params => (
                      <TextField 
                        {...params} 
                        label="Hours" 
                        fullWidth 
                        error={!hours}
                        helperText={!hours && "Required"}
                      />
                    )}
                    onChange={(e, value) => this.autocompleteChange(e, value, 'hours')}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <Autocomplete
                    value={minutes}
                    options={["0","15","30","45"]} 
                    autoHighlight={true}
                    renderInput={params => (
                      <TextField 
                        {...params} 
                        label="Minutes" 
                        fullWidth 
                        error={!minutes}
                        helperText={!minutes && "Required"}
                      />
                    )}
                    onChange={(e, value) => this.autocompleteChange(e, value, 'minutes')}
                  />
                </div>
          	    {/*<div className="col-lg-6">
          	      <span className="pf-title">Start Time</span>
                  <div className="pf-field">
                    <DatePicker
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      showTimeSelect
                      minDate={new Date()}
                      selected={this.state.startTime}
                      onChange={(date) => this.datePickerChange(date,'startTime')}
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <span className="pf-title">Hours</span>
                  <div className="pf-field">
					 					<NumericInput min={0} max={12} step={1} value={this.state.hours} onChange={(val) => this.handleNumericChange(val, 'hours')} />
                  </div>
                </div>
                <div className="col-lg-3">
                  <span className="pf-title">Minutes</span>
                  <div className="pf-field">
					 					<NumericInput min={0} max={45} step={15} value={this.state.minutes} onChange={(val) => this.handleNumericChange(val, 'minutes')} />
                  </div>
                </div>*/}
                <div className="col-lg-12">
                  <TextField
                    name="venue"
                    label="Venue"
                    value={venue}
                    onChange={this.textboxChange}
                    fullWidth
                    error={!venue}
                    helperText={!venue && "Required"}
                  />
                </div>
                <div className="col-12 pt-3">
                  <TextField
                    className="jobTextArea"
                    name="detail"
                    label="Interview Detail"
                    fullWidth
                    multiline={true}
                    variant="outlined"
                    value={detail}
                    onChange={this.textboxChange}
                  />
                  {/*
                  <label className="m-0 pb-1" style={{'fontSize':'16px'}}>Interview Detail</label>
                  <Textarea useCacheForDOMMeasurements style={{'fontSize':'16px'}} className="w-100" name="detail" minRows="8" value={detail} onChange={this.textboxChange} />
                  */}
                </div>
                {/*<div className="col-lg-12">
                  <span className="pf-title">Detail</span>
                  <div className="pf-field">
                   	<Textarea useCacheForDOMMeasurements placeholder="Please input the interview detail..." name="detail" value={this.state.detail} onChange={this.textboxChange} />
                  </div>
                </div>*/}
                <div className="col-lg-12">
                  <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.interviewSchedule}>Send</Button>
                  <Button className="mt-2 mr-2 mr-auto" onClick={() => closeModal('interviewModalIsOpen')}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
            {/*</div>
          </div>
        </Widget>
      </Modal>*/}
      </Dialog>
    );
  }
}

export default InterviewScheduleForm;
