import React, {Component} from "react";
import { connect } from 'react-redux';
import axios from "axios";
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import InputRange from 'react-input-range';
import { dataURItoBlob } from 'util/functions.js';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { requestInitUser } from 'actions/Auth';
import * as notification from 'actions/Notification';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';

import 'react-input-range/lib/css/index.css';

class ProfilePictureEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:'',
      isOpenDragDropImgPop: false,
      isOpenChangeImgPop: false,
      imagescale: 1,
      isSubmitLoading: false,
    };
  }
  
  picUploaded = (acceptedFiles) => {
    if(acceptedFiles[0] && acceptedFiles[0].name && acceptedFiles[0].name.toLowerCase().match(/(png|jpg|jpeg).*/))
    {
      this.setState({ image:acceptedFiles[0] }); 
      this.changeImgPop(false,true);
    }
    else
    {
      this.setState({image:''});
      notification.error("Please upload picture in png / jpg / jpeg formats.");
    }
    
  }
  
  changeImgPop = (dragDropPop, changeImgPop) => {
    this.setState({
      isOpenDragDropImgPop: dragDropPop,
      isOpenChangeImgPop: changeImgPop
    })
  }
  afterOpenModal = () =>{
    this.setState({image:'',imagescale: 1});
    this.changeImgPop(true,false);
  }
  
  handleDrop = dropped => {
    this.setState({ newPictureUrl: dropped[0] })
  }

  submitProfilePic = () =>{
    this.setState({ isSubmitLoading: true });
    
    const canvas = this.editor.getImageScaledToCanvas().toDataURL();
    var blobImg = dataURItoBlob(canvas);
    //this.props.updateProfilePic(blobImg);
    const formData = new FormData();
    formData.append('file', blobImg);
    console.log(formData);
  
    axios.post('/api/users/set/picture/upload', formData)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("Your profile picture has been updated successfully.");
        console.log(res.data);
        this.setState({ isSubmitLoading: false });
        //alert("The picture has been uploaded to S3!");
        this.props.requestInitUser();
        this.props.closeModal();
      }
      else {
        if(res.data.msg) 
          notification.error(res.data.msg);
        else
          notification.error("The action cannot be performed at the moment. Please try again later.");
        this.setState({ isSubmitLoading: false });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  setEditorRef = (editor) => this.editor = editor;
    
  render() {
    const { isProfileEdit, isSubmitLoading } = this.props;
    return (
      
      <Dialog open={isProfileEdit == true ? true : false} onEnter={this.afterOpenModal} onClose={() => this.props.closeModal()} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
        <DialogContent id="application-list">  
          <div className="mb-3">
            <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Edit Profile Picture <span className="close-popup" onClick={()=>this.props.closeModal()}><i className="la la-close"></i></span></h3>
          </div>
          {this.state.isOpenDragDropImgPop &&
           <div style={{'background':'white'}} className="dropzone-card">
              <Dropzone className="dropzone" accept='image/jpeg, image/png' onDrop={acceptedFiles => this.picUploaded(acceptedFiles)}> 
                {({getRootProps, getInputProps}) => (
                  <section style={{'width':'270px','height':'270px'}}>
                    <div {...getRootProps({style:{'top':'15%','position': 'relative'}, className: 'dropzone-file-btn'})}>
                      <input {...getInputProps()} />
                      <p>Drag and drop image here, or click to select image.</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          }
          {this.state.isOpenChangeImgPop &&
            <div>
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
                {/*<Button style={{'display':'grid'}} color="primary" className="jr-btn jr-btn-lg text-white bg-primary" onClick={(e) => this.submitProfilePic()}>
                  Submit
                </Button>*/}
                <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => this.submitProfilePic()}>
                  { isSubmitLoading && <CircularProgress color="secondary" size={20} className="mr-2" /> }
                  Submit
                </Button>
                <Button className="mt-2 mr-2 mr-auto" onClick={() => this.props.closeModal()}>Cancel</Button>
              </span>
            </div>
          }
        </DialogContent>
      </Dialog>  
    )
  }
};

const mapDispatchToProps = {
  requestInitUser,
}

export default connect(null, mapDispatchToProps)(ProfilePictureEdit);