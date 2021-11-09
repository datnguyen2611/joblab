import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SignupContent from 'components/auth/SignupContent';

/*import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
Modal.setAppElement(document.getElementById('root'));*/

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      isSignupLoading: false,
      isUploadLoading: false,
      isUploadSuccess: false,
      
      userType: 'candidate',
    };
  }
  
  componentDidMount() {
    this.suggestThemeSignUp = {
      container:                'containerProfile',
      containerOpen:            'containerOpenProfile',
      input:                    'inputSignUp',
      inputOpen:                'inputOpenProfile',
      inputFocused:             'inputFocusedProfile',
      suggestionsContainer:     'suggestionsContainerSignUp',
      suggestionsContainerOpen: 'suggestionsContainerOpenProfile',
      suggestionsList:          'suggestionsListProfile',
      suggestion:               'suggestionProfile',
      suggestionFirst:          'suggestionFirstProfile',
      suggestionHighlighted:    'suggestionHighlightedProfile',
      sectionContainer:         'sectionContainerProfile',
      sectionContainerFirst:    'sectionContainerFirstProfile',
      sectionTitle:             'sectionTitleProfile'
    }
  }
  
  render() {
    const { isOpen, closeModal } = this.props;
    
    return (
      <Dialog open={isOpen} onClose={closeModal} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
      {/*<Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle.loginModalStyle}
        contentLabel="Example Modal"
      >
        
        <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">*/}
        <div className="signup-content text-center">
        <span className="close-popup" onClick={this.props.closeModal}><i className="la la-close"></i></span>
          {/*<div className="login-header">
            <Link className="app-logo signup" to="/" title="JobsLab">
              <img src={require("images/Jobslab_blue.png")} alt="JobsLab" title="JobsLab"/>
            </Link>
          </div>*/}
  
          <DialogTitle id="form-dialog-title" onClose={closeModal}>Create an account</DialogTitle>
          {/*<div className="mb-4">
            <h2><b>{/*<IntlMessages id="appModule.createAccount"/>Create an account</b></h2>
          </div>*/}
          <DialogContent>
            <SignupContent isClient={false} isPopup={true} closePopup={this.props.closeModal} />
          </DialogContent>
        </div>
      {/*</div>
    </Modal>*/}
    </Dialog>
    );
  }
  
}


export default SignupForm;
