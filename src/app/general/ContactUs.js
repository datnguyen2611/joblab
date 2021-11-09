import React, { Component } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as notification from 'actions/Notification';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      content: '',
      
      isFirstNameInput: true,
      isLastNameInput: true,
      isEmailInput: true,
      isPhoneInput: true,
      isSubjectInput: true,
      isContentInput: true,
      
      isSubmitSuccess: false,
    };
  }

  componentDidMount() {
    //this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
  }
  
  inputValidate(name) {
    switch (name) {
      case 'firstName':
        this.setState({ isFirstNameInput: this.state.firstName ? true : false });
        break;
      case 'lastName':
        this.setState({ isLastNameInput: this.state.lastName ? true : false });
        break;
      case 'email':
        this.setState({ isEmailInput: this.state.email ? true : false });
        break;
      case 'phone':
        this.setState({ isPhoneInput: this.state.phone ? true : false });
        break;
      case 'subject':
        this.setState({ isSubjectInput: this.state.subject ? true : false });
        break;
      case 'content':
        this.setState({ isContentInput: this.state.content ? true : false });
        break;
      default: 
        this.setState({
          isFirstNameInput: this.state.firstName ? true : false,
          isLastNameInput: this.state.lastName ? true : false,
          isEmailInput: this.state.email ? true : false,
          isPhoneInput: this.state.phone ? true : false,
          isSubjectInput: this.state.subject ? true : false,
          isContentInput: this.state.content ? true : false
        });
    }
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value }, () => {
      switch (name) {
        case 'firstName':
          this.setState({ isFirstNameInput: true });
          break;
        case 'lastName':
          this.setState({ isLastNameInput: true });
          break;
        case 'email':
          this.setState({ isEmailInput: true });
          break;
        case 'phone':
          this.setState({ isPhoneInput: true });
          break;
        case 'subject':
          this.setState({ isSubjectInput: true });
          break;
        case 'content':
          this.setState({ isContentInput: true });
          break;
      }
    });
  }
  
  formSubmit = (e) => {
    e.preventDefault();
    
    this.setState({
      isFirstNameInput: this.state.firstName ? true : false,
      isLastNameInput: this.state.lastName ? true : false,
      isEmailInput: this.state.email ? true : false,
      isPhoneInput: this.state.phone ? true : false,
      isSubjectInput: this.state.subject ? true : false,
      isContentInput: this.state.content ? true : false,
    }, () => {
      const { isFirstNameInput, isLastNameInput, isEmailInput, isPhoneInput, isSubjectInput, isContentInput } = this.state;
      if (isFirstNameInput && isLastNameInput && isEmailInput, isPhoneInput && isSubjectInput && isContentInput) {
        const data = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          subject: this.state.subject,
          content: this.state.content,
        };
        
        axios.post('/api/help/contact', data)
        .then(res => {
          if (res.data.isSuccess) {
            this.setState({ isSubmitSuccess: true });
          }
          else {
            notification.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    });
  }

  render() {
    const { firstName, lastName, email, phone, subject, content } = this.state;
    const { isFirstNameInput, isLastNameInput, isEmailInput, isPhoneInput, isSubjectInput, isContentInput, isSubmitSuccess } = this.state;
    
    return (
      <div className="app-wrapper contactus">
      <div className="contactus-bg">
        <img src={encodeURI(WEB_IMAGE_URL+"contact/contactus.jpg")} alt="" />
      </div>
          <Helmet>
              <title>Contact Us | JobsLab</title>
          </Helmet>
      <div className="animated slideInUpTiny animation-duration-3 paddingtop">
      {/*<ContainerHeader title={"Contact Us"}/>*/}
      <div className="row">
        <div className="col-lg-9 col-md-8 col-sm-7 col-12">
          <h3 className="contactus-title">Keep In Touch</h3>
          <form action="" className="contact-form contactus">
            <div className="row">
              <div className="col-md-6 col-12">
                <TextField
                  name="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={this.textboxChange}
                  fullWidth
                  variant="filled"
                  error={!isFirstNameInput}
                  helperText={!isFirstNameInput && "Required"}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}
                />
              </div>

              <div className="col-md-6 col-12">
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={this.textboxChange}
                  fullWidth
                  variant="filled"
                  error={!isLastNameInput}
                  helperText={!isLastNameInput && "Required"}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6 col-12">
                <TextField
                  name="email"
                  label="Email"
                  value={email}
                  onChange={this.textboxChange}
                  fullWidth
                  variant="filled"
                  error={!isEmailInput}
                  helperText={!isEmailInput && "Required"}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}
                />
              </div>

              <div className="col-md-6 col-12">
                <TextField
                  name="phone"
                  label="Phone"
                  value={phone}
                  onChange={this.textboxChange}
                  fullWidth
                  variant="filled"
                  error={!isPhoneInput}
                  helperText={!isPhoneInput && "Required"}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <TextField
                  name="subject"
                  label="Subject"
                  value={subject}
                  onChange={this.textboxChange}
                  fullWidth
                  variant="filled"
                  error={!isSubjectInput}
                  helperText={!isSubjectInput && "Required"}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <TextField
                  className="jobTextArea"
                  name="content"
                  label="How can we help you?"
                  value={content}
                  onChange={this.textboxChange}
                  fullWidth
                  variant="filled"
                  error={!isContentInput}
                  helperText={!isContentInput && "Required"}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}
                />
              </div>
            </div>
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.formSubmit}>Submit</Button>
          </form>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-5 col-12 contactus">
          <div className="contact-block jr-card py-5 px-4">
            <ul className="contact-info vertical">
              <li>
                <i className="zmdi zmdi-pin zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">JOBSLAB OFFICE</h4>
                  <address className="mb-0">
                    17/F, Tesbury Center
                    <br/>
                    28 Queen's Road East
                    <br/>
                    Wan Chai, Hong Kong
                  </address>
                </div>
              </li>

              <li>
                <i className="zmdi zmdi-phone zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">Phone</h4>
                  <div><a className="jr-link text-primary disable-link" href="tel:+85265733411">+852 6573 3411</a></div>
                </div>
              </li>

              <li>
                <i className="zmdi zmdi-email zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">E-mail</h4>
                  <div><a className="text-primary jr-link" href="mailto:info@jobslab.io">info@jobslab.io</a>
                  </div>
                  <div className="icons-wrapper">
                    <a href="https://www.facebook.com/jobslab.io" target="_blank" className="icon facebook-icon jr-link">
                      <i className="zmdi zmdi-facebook"/>
                    </a>
                    
                    <a href="https://www.linkedin.com/company/jobslab" target="_blank" className="icon linkedin-icon jr-link">
                      <i className="zmdi zmdi-linkedin"/>
                    </a>

                    <a href="https://twitter.com/jobslabjobs" target="_blank" className="icon twitter-icon jr-link">
                      <i className="zmdi zmdi-twitter"/>
                    </a>

                    {/*<span className="icon google-icon jr-link">
                      <i className="zmdi zmdi-google-plus"/>
                    </span>*/}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <SweetAlert show={isSubmitSuccess} success title={"Message Sent"/*<IntlMessages id="sweetAlerts.goodJob"/>*/}
                onConfirm={ () => this.setState({ isSubmitSuccess: false }) }>
      Your message has been sent. Our team will contact you shortly.
      {/*<IntlMessages id="sweetAlerts.btnClicked"/>*/}
    </SweetAlert>
    </div>
    )
  }
}

export default ContactUs;