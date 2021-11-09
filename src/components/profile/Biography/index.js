import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Widget from "components/Widget";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Textarea from 'react-textarea-autosize';
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';
import TextField from '@material-ui/core/TextField';

class Biography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      
      newDescription: '',
      uploadedDescription: null,
    };
  }
  
  componentDidMount() {
    if (this.props.isEdit)
      this.setState({ isEdit: this.props.isEdit });
    if (this.props.candidateData)
      this.setState({ 
        newDescription: this.props.candidateData.description 
      });
  }
  
  componentDidUpdate(prevProps) { //For Upload CV
    console.log(this.props.uploadedCV)
    if (this.props.uploadedCV !== prevProps.uploadedCV) 
      this.setState({ uploadedDescription: this.props.uploadedCV.description });
  }
  
  editSave = (description) => {
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
      description,
    }
    
    axios.post('/api/candidates/set/profile/description/update', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        this.props.getUserData();
        //this.props.requestInitUser();
        this.setState({ isEdit: false });
        notification.success("Your Profile has been updated successfully.");
        this.props.cancelUploadEdit();
      }
      else {
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  editCancel = () => {
    this.setState({
      isEdit: false,
      newDescription: this.props.candidateData.description
    })
  }
  
  textboxChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    const userRole = this.props.userRole;
    const { description } = this.props.candidateData;
    const { isUploadEdit, cancelUploadEdit } = this.props;
    const { isEdit, newDescription, uploadedDescription } = this.state;
    
    return (
      <Widget styleName="jr-card-profile">
        <div className="d-flex">
          <h3 className="card-title mr-auto mb-1 mb-md-3">Biography</h3>
          { (userRole=="candidate" || userRole=="admin") && !isEdit && !isUploadEdit && 
            <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => this.setState({ isEdit: true })}>
              <i class="zmdi zmdi-edit"/>
            </IconButton>
          }
        </div>
        
        { (userRole=="candidate" || userRole=="admin") && isUploadEdit &&
          <div className="border border-info rounded w-100 p-2 mb-2">
            <h3 className="card-heading text-info">AI Generated</h3>
            <TextField
              className="jobTextArea"
              name="uploadedDescription"
              label="Description"
              fullWidth
              multiline={true}
              variant="outlined"
              value={uploadedDescription}
              onChange={this.textboxChange}
              />
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={() => this.editSave(uploadedDescription)}>Replace</Button>
            <Button className="mt-2 mr-2 mr-auto" onClick={cancelUploadEdit}>Cancel</Button>
          </div>
        }
        
        { (userRole=="candidate" || userRole=="admin") && isEdit && !isUploadEdit
          ?
          <div>
            <TextField
              className="jobTextArea"
              name="newDescription"
              label="Description"
              fullWidth
              multiline={true}
              variant="outlined"
              value={newDescription}
              onChange={this.textboxChange}
              />
                {/*
                <Textarea useCacheForDOMMeasurements className="w-100" name="newDescription" placeholder="Please input your description..." value={newDescription} onChange={this.textboxChange} />
                */}
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={() => this.editSave(newDescription)}>Save</Button>
            <Button className="mt-2 mr-2" onClick={this.editCancel}>Cancel</Button>
          </div>
          :
          description && description.split("\n").map((text, index) => (
 					  <p key={index}>{text}</p>
 					))
        }
      </Widget>
    )
  }
}

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(null, mapDispatchToProps)(Biography));
