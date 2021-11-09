import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';
//import { withStyles } from "@material-ui/core/styles";

class Beta extends Component {
  render() {
    const { isOpen, closeModal } = this.props;
  
    return (
      <Dialog fullWidth open={isOpen} onClose={closeModal} aria-labelledby="form-dialog-title">
      
        <DialogTitle id="form-dialog-title"
        style={{ //backgroundImage: `url(${"https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/home/banner3.jpg"})`, 
          overflow: "hidden"
        }}
        >
        <div className="beta-popup-title">
          <div className="beta-popup-img-bg">
            <div className="color-overlay"/>
            <img src={encodeURI(WEB_IMAGE_URL+"beta/beta-popup-bg.png")} alt="" />
          </div>
          <div className="beta-margin-top"/><h3>JobsLab is</h3>
          <h3>Now in Beta</h3>
        </div>
        </DialogTitle>
        
        <DialogContent style={{ overflow: "hidden", background: "#e2e2e2" }}>
          <DialogContentText>
            <div className="beta-popup-content">
              <div className="beta-popup-step">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/step1.png")} alt="" />
                <h3>Register</h3><h3>Instantly</h3>
              </div>
              <div className="beta-popup-arrow">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/arrow.png")} alt="" />
                <img className="beta-resp-arrow" src={encodeURI(WEB_IMAGE_URL+"beta/responsive-arrow.png")} alt="" />
              </div>
              <div className="beta-popup-step">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/step2.png")} alt="" />
                <h3>Get Matched</h3><h3>by Our AI</h3>
              </div>
              <div className="beta-popup-arrow">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/arrow.png")} alt="" />
                <img className="beta-resp-arrow" src={encodeURI(WEB_IMAGE_URL+"beta/responsive-arrow.png")} alt="" />
              </div>
              <div className="beta-popup-step">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/step3.png")} alt="" />
                <h3>Ace the</h3><h3>Interview</h3>
              </div>
              <div className="beta-popup-arrow">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/arrow.png")} alt="" />
                <img className="beta-resp-arrow" src={encodeURI(WEB_IMAGE_URL+"beta/responsive-arrow.png")} alt="" />
              </div>
              <div className="beta-popup-step">
                <img src={encodeURI(WEB_IMAGE_URL+"beta/step4.png")} alt="" />
                <h3>Take the</h3><h3>Offer</h3>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

//export default Beta;
export default Beta;