import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Avatar from 'react-avatar';
import ProfilePictureEdit from 'components/popup/ProfilePictureEdit';
import * as notification from 'actions/Notification';

class ProfilePicture extends React.Component {
  state = {
    pictureUrl: '',
    isProfileEdit: false,
  };
  
  componentDidMount() {
  }
  
  closeProfilePictEdit = () => {
    this.setState({ isProfileEdit: false });
  }
  
  render() {
    const { name, pictureUrl } = this.props.userData;
    const { activeStep, handleBack, handleNext } = this.props;
    return (
      <div>
        <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="row">
            <div className="col-md-6">
              <div className="propic-hover">
                <Avatar 
                  round={ true } 
                  size={ 250 }
                  style={ {margin: 2, boxShadow: '0px 0px 30px grey', backgroundColor: 'white', cursor: 'pointer'} }
                  src={ pictureUrl } 
                  name={ name.firstName+" "+name.lastName } 
                  onClick={ () => this.setState({ isProfileEdit: true }) }
                />
                <div class="edit-propic settings" onClick={ () => this.setState({ isProfileEdit: true }) }><h3><i class="zmdi zmdi-camera"></i>&nbsp;Upload</h3></div>
              </div>
            </div>
            <div className="col-md-6 register-text">
              <h3 className="register-title">Upload a Profile Picture</h3>
              <h3>Complete you profile with a good looking photo to </h3>
              <h3>make your profile more attractive to employers.</h3>
            </div>
          </div>
        <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
        <div className="d-flex">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="ml-auto mr-2"
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
        <ProfilePictureEdit isProfileEdit={this.state.isProfileEdit} closeModal={this.closeProfilePictEdit} />
      </div>
    );
  }
}

export default ProfilePicture;