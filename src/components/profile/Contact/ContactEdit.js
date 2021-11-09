import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';
//import SelectSingle from 'components/ReactSelect/SelectSingle';

class ContactEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //email: '',
      dial:'',
      number: '',
    };
  }
  
  componentDidMount() {
    if (this.props.userData)
      this.setState({ 
        //email: this.props.userData.email,
        number: this.props.userData.phone && this.props.userData.phone.number,
        dial: this.props.userData.phone ? { value: this.props.userData.phone.dial, label: this.props.userData.phone.dial } : { value: "+852", label: "+852"},
      });
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  /*handleSelectChange = (object, name) => {
    this.setState({ [name]: object });
  };*/
  
  autocompleteChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  editSave = () => {
    const data = {
      candId: this.props.userData && this.props.userData._id,//this.props.match.params.Id,
      dial: this.state.dial && this.state.dial.value,
      number: this.state.number,
    };
    axios.post('/api/users/set/profile/phone/update', data)
    .then(res => {
      if (res.data.isSuccess) {
        this.props.refresh();
        //this.props.requestInitUser();
        notification.success("Your phone number has been updated successfully.");
        this.props.cancel(); 
      }
      else {
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render(){
    const { /*email,*/ dial, number } = this.state;
    const { dialList } = this.props;
    return (
      <div>
        {/*<div className="media align-items-center flex-nowrap jr-pro-contact-list">
          <div className="mr-3">
            <i className={`zmdi zmdi-email jr-fs-xxl text-grey`}/>
          </div>
          <div className="media-body">
            <TextField id="email"
              name="email"
              label="Email"
              value={email}
              onChange={this.textboxChange}
              fullWidth 
            />
          </div>
        </div>*/}
        <div className="media align-items-center flex-nowrap jr-pro-contact-list">
          <div className="mr-3">
            <i className={`zmdi zmdi-phone jr-fs-xxl text-grey`}/>
          </div>
          <div className="media-body">
            <div className="media-body row">
              <div className="col-md-6 col-12">
                {/*<SelectSingle 
                  label="Dial" 
                  value={dial} 
                  options={dialList} 
                  onChange={(obj) => this.handleSelectChange(obj,'dial')}  
                />*/}
                <Autocomplete
                  value={dial}
                  options={dialList}
                  getOptionLabel={option => option.label}
                  autoHighlight={true}
                  blurOnSelect={true}
                  disableClearable={true}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      label="Dial" 
                      fullWidth 
                      error={!dial}
                      helperText={!dial && "Required"}
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'dial')}
                />
              </div>
              <div className="col-md-6 col-12">
                <TextField
                  id="number"
                  name="number"
                  label="Number"
                  value={number}
                  onChange={this.textboxChange}
                  fullWidth
                  error={!number}
                  helperText={!number && "Required"}
                />
              </div>
            </div>
          </div>
        </div>
        <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
        <Button className="mt-2 mr-2" onClick={this.props.cancel}>Cancel</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { dialList } = state.list;
  return { dialList }
};

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactEdit));
