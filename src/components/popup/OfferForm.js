import React, { Component } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputSalary from 'components/InputNumber/InputSalary';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from 'util/IntlMessages';
import * as notification from 'actions/Notification';


class OfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      salary: null,
      bonus: null,
      noticePeriod: 1,
      probation: 3,
      annualLeave: 12,
      
      isLoading: false,
      isSubmitWarning: false,
    };
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleNumberInputChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: parseInt(e.target.value, 10) });
  };
  
  offerJob = () => {
    const data = {
      appId: this.props.appId,
      salary: this.state.salary,
      bonus: this.state.bonus,
      noticePeriod: this.state.noticePeriod,
      probation: this.state.probation,
      detail: this.state.detail,
    };
    axios.post('/api/admins/set/offer/confirm', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have successfully confirmed an offer for this application.");
        this.props.completeOffer();
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
    const { salary, bonus, noticePeriod, probation, detail } = this.state;
    const { isLoading, isSubmitWarning } = this.state;
    return (
      <Dialog open={isOpen} onClose={() => closeModal('offerModalIsOpen')} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Make an Offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make an Offer
          </DialogContentText>
          <div className="row justify-content-left">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <InputSalary
                name="salary"
                label="Monthly Salary (HKD)"
                value={salary}
                onChange={this.handleNumberInputChange}
                error={!salary}
                helperText={!salary && "Required"}
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <InputSalary
                name="bonus"
                label="Annual Bonus (HKD)"
                value={bonus}
                onChange={this.handleNumberInputChange}
                error={!bonus}
                helperText={!bonus && "Required"}
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <TextField
                name="noticePeriod"
                label="Notice Period (in Month)"
                type="number"
                inputProps={{ min: "0", step: "1" }}
                value={noticePeriod}
                onChange={this.handleNumberInputChange}
                error={!noticePeriod}
                helperText={!noticePeriod && "Required"}
                fullWidth
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <TextField
                name="probation"
                label="Probation Period (in Month)"
                type="number"
                inputProps={{ min: "0", step: "1" }}
                value={probation}
                onChange={this.handleNumberInputChange}
                error={!probation}
                helperText={!probation && "Required"}
                fullWidth
              />
            </div>
            <div className="col-12 pt-3">
              <TextField
                className="jobTextArea"
                name="detail"
                label="Offer Detail"
                fullWidth
                multiline={true}
                variant="outlined"
                value={detail}
                onChange={this.textboxChange}
              />
            </div>
            {/*<div className="col-lg-12">
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={() => this.setState({ isSubmitWarning: true })}>Offer</Button>
              <Button className="mt-2 mr-2 mr-auto" onClick={() => closeModal('offerModalIsOpen')}>Cancel</Button>
            </div>*/}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal('offerModalIsOpen')} color="primary">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={() => this.setState({ isSubmitWarning: true })} color="primary">
            { isLoading && <CircularProgress color="secondary" size={20} className="mr-2" /> }
            Offer
          </Button>
        </DialogActions>
        <SweetAlert show={isSubmitWarning}
                    warning
                    showCancel
                    confirmBtnText="Yes, Submit It!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                    onConfirm={this.offerJob}
                    onCancel={() => this.setState({ isSubmitWarning: false })}
        >
          <IntlMessages id="sweetAlerts.youWillNotAble"/>
        </SweetAlert>
      </Dialog>
    );
  }
}

export default OfferForm;
