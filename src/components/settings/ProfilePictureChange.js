import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Widget from "components/Widget";
import Avatar from 'react-avatar';
import ProfilePictureEdit from 'components/popup/ProfilePictureEdit';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import InputRange from 'react-input-range';
import Button from '@material-ui/core/Button';
import { dataURItoBlob } from 'util/functions.js';
import { requestInitUser } from 'actions/Auth';

import 'react-input-range/lib/css/index.css';
import * as notification from 'actions/Notification';

class ProfilePictureChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileEdit: false,
      
      image:'',
      isOpenChangeImgPop: false,
      imagescale: 1
    };
  }
  
  changeImgPop = (dragDropPop, changeImgPop) => {
    this.setState({
      isOpenDragDropImgPop: dragDropPop,
      isOpenChangeImgPop: changeImgPop
    })
  }
  
  handleDrop = dropped => {
    this.setState({ newPictureUrl: dropped[0] })
  }

  submitProfilePic = () =>{
    const canvas = this.editor.getImageScaledToCanvas().toDataURL();
    var blobImg = dataURItoBlob(canvas);
    //this.props.updateProfilePic(blobImg);
    const formData = new FormData();
    formData.append('file', blobImg);
    
    axios.post('/api/users/set/picture/upload', formData)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("Your profile picture has been updated successfully.");
        console.log(res.data);
        //alert("The picture has been uploaded to S3!");
        this.props.requestInitUser();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  setEditorRef = (editor) => this.editor = editor;
  
  
  
  closeProfilePictEdit =() => {
    this.setState({ isProfileEdit: false });
  }

  render() {
    const { name, pictureUrl } = this.props.userData;
    const { isProfileEdit } = this.state;
    
    return (
      <Widget styleName="jr-card-profile">
        <div className="mb-2">
          <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Change Profile Picture</h3>
        </div>
        
        {/*<div className="dropzone-card ml-auto mr-auto">
          <Dropzone className="dropzone" onDrop={acceptedFiles => {this.setState({image:acceptedFiles[0]}); this.changeImgPop(false,true); }}>
            {({getRootProps, getInputProps}) => (
              <section style={{'width':'270px','height':'270px'}}>
                <div {...getRootProps({style:{'top':'15%','position': 'relative', margin: 0}, className: 'dropzone-file-btn'})}>
                  <input {...getInputProps()} />
                  <p>Drag and drop image here, or click to select image.</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
         {this.state.isOpenChangeImgPop &&
          <div className="ml-auto mr-auto">
            <AvatarEditor
              ref={this.setEditorRef}
              style={{'background':'gray'}}
              image={ this.state.image } 
              width={250}
              height={250}
              border={10}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={this.state.imagescale}
              rotate={0}
            />
            <span style={{'display':'block','color':'white'}}>
            Scale:
              <InputRange
  	 				  step={0.1}
              maxValue={2}
              minValue={1}
              value={this.state.imagescale}
              onChange={imagescale => { this.setState({imagescale: Math.round( imagescale * 10 ) / 10 })}} />
            </span>
            <span>
              <Button style={{'display':'grid','width':'100%'}} color="primary" className="jr-btn jr-btn-lg text-white bg-primary" onClick={(e) => this.submitProfilePic()}>
                Submit
              </Button> 
            </span>
          </div>
         }*/}
        
        <div className="propic-hover profile ml-auto mr-auto">
          <Avatar 
            round={ true } 
            size={ 150 }
            style={ {margin: 2, boxShadow: '0px 0px 30px grey', backgroundColor: 'white', cursor: 'pointer'} }
            src={ pictureUrl } 
            name={ name && name.firstName+" "+name.lastName } 
            onClick={ () => this.setState({ isProfileEdit: true }) } 
          />
          <div className="edit-propic profile settings" onClick={ () => this.setState({ isProfileEdit: true }) }><h3><i className="zmdi zmdi-camera"></i>&nbsp;Upload</h3></div>
        </div>
        
        <ProfilePictureEdit isProfileEdit={isProfileEdit} closeModal={this.closeProfilePictEdit} />
      </Widget>
    );
  }
}

function mapStateToProps(state) {
  const { userData } = state.auth;
  return { userData };
}

const mapDispatchToProps = {
  requestInitUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureChange);
