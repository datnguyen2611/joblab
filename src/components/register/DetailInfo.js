import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Widget from "components/Widget";
import Biography from 'components/profile/Biography';
import Career from 'components/profile/Career';
import Education from 'components/profile/Education';
import SkillTag from 'components/profile/SkillTag';
import UploadButton from "components/UploadButton";
import SweetAlert from 'react-bootstrap-sweetalert';
import * as notification from 'actions/Notification';
import UploadCV from 'components/register/UploadCV';

class DetailInfo extends React.Component {
  state = {
    careerIsAdd: true,
    eduIsAdd: true,
    
    isUploadLoading: false,
    isUploadSuccess: false,
    uploadedCV: null,
    
    isUploadedCareerEdit: [],
    isUploadedEducationEdit: [],
    isUploadedDescriptionEdit: false,
    isUploadedSpecialityEdit: false,
  };
  
  componentDidMount() {
    if (this.props.candidateData) {
      if (this.props.candidateData.career && this.props.candidateData.career.length > 0)
        this.setState({ careerIsAdd: false });
      if (this.props.candidateData.education && this.props.candidateData.education.length > 0)
        this.setState({ eduIsAdd: false });
    }
  }
  
  componentDidUpdate(prevProps) { 
    if (this.props.candidateData !== prevProps.candidateData) {
      if (this.props.candidateData.career && this.props.candidateData.career.length > 0)
        this.setState({ careerIsAdd: false });
      if (this.props.candidateData.education && this.props.candidateData.education.length > 0)
        this.setState({ eduIsAdd: false });
    }
  }
  
  cvUpload = (acceptedFiles) => {
    //let cvFile = e.target.files[0];
    let cvFile = acceptedFiles[0];
    this.setState({ isUploadLoading: true });
    
    const formData = new FormData();
    if (cvFile != null) {
      formData.append('cvFile', cvFile);
      console.log('start to upload cv');
      axios.post('/api/candidates/set/resume/upload', formData)
      .then(res => {
        if (res.data.isSuccess) {
          //alert("CV auto-filled. Remember to SAVE your resume after modification.");
          console.log(res.data.cvDataParsed)
          this.setState({ 
            careerIsAdd: false,
            eduIsAdd: false, 
            
            isUploadLoading: false,
            isUploadSuccess: true,
            
            uploadedCV: (res.data.cvDataParsed==null) ? null : res.data.cvDataParsed,
            isUploadedCareerEdit: (res.data.cvDataParsed.career==null) ? [] : new Array(res.data.cvDataParsed.career.length).fill(true),
            isUploadedEducationEdit: (res.data.cvDataParsed.education==null) ? [] : new Array(res.data.cvDataParsed.education.length).fill(true),
            isUploadedDescriptionEdit: true,
            isUploadedSpecialityEdit: true,
          });
        }
        else {
          this.setState({ isUploadLoading: false });
          notification.error(res.data.msg);
        }
      })
      .catch(function (err) {
        this.setState({ isUploadLoading: false });
        console.log(err);
        //e.preventDefault();
      });
    }
  }
  
  cancelUploadCareer = (index) => {
    let array = [...this.state.isUploadedCareerEdit];
    if (index !== -1) {
      array[index] = false;
      this.setState({isUploadedCareerEdit: array});
    }
  }
  
  cancelUploadEducation = (index) => {
    let array = [...this.state.isUploadedEducationEdit];
    if (index !== -1) {
      array[index] = false;
      this.setState({isUploadedEducationEdit: array});
    }
  }
  
  cancelUploadDescription = () => {
    this.setState({ isUploadedDescriptionEdit: false })
  }
  
  cancelUploadSpeciality = () => {
    this.setState({ isUploadedSpecialityEdit: false })
  }
  
  nextStep = () => {
    var candidateData = this.props.candidateData;
    //if (candidateData.speciality && candidateData.speciality.length > 0 && candidateData.speciality.length < 11 && candidateData.language && candidateData.language.length > 0 && candidateData.language.length < 6 && candidateData.career.length > 0)
    if (candidateData.career.length > 0)
      this.props.handleNext();
    else
      notification.error("Please input and save career info to complete your profile.")
  }
  
  render() {
    const { candidateData, getUserData } = this.props;
    const { careerIsAdd, eduIsAdd } = this.state;
    const { acceptedFiles,  isUploadLoading, isUploadSuccess } = this.state;
    const { uploadedCV, isUploadedCareerEdit, isUploadedEducationEdit, isUploadedDescriptionEdit, isUploadedSpecialityEdit } = this.state;
    const { activeStep, handleNext, handleBack } = this.props;
    
    return ( 
      <div className="tab-pane" id="tab2-3">
        { !uploadedCV && <UploadCV isUploadLoading={isUploadLoading} cvUpload={this.cvUpload}/> }
        <div className="row">
          {/*<div className="col-12">
            <UploadButton name="Upload CV" accept=".doc,.docx,.pdf" isLoading={isUploadLoading} onChange={this.cvUpload} />
          >*/}
          {/*<div className="col-md-12">
            <div className="form-group">
              <SkillTag isEdit={true} userRole={"candidate"} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedSpecialityEdit} cancelUploadEdit={this.cancelUploadSpeciality} getUserData={this.getUserData} />
            </div>
          </div>*/}
          <div className="col-md-12">
            <div className="form-group">
              <Biography isEdit={true} userRole={"candidate"} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedDescriptionEdit} cancelUploadEdit={this.cancelUploadDescription} getUserData={getUserData} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <Career isAdd={careerIsAdd} userRole={"candidate"} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedCareerEdit} cancelUploadEdit={this.cancelUploadCareer} getUserData={getUserData} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <Education isAdd={eduIsAdd} userRole={"candidate"} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedEducationEdit} cancelUploadEdit={this.cancelUploadEducation} getUserData={getUserData} />
            </div>
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
          <Button variant="contained" color="primary" onClick={this.nextStep}>
            Next
          </Button>
        </div>
        <SweetAlert show={isUploadSuccess} success title={"Congratulations!"/*<IntlMessages id="sweetAlerts.goodJob"/>*/}
                    onConfirm={ () => this.setState({ isUploadSuccess: false }) }>
          Your CV has been uploaded successfully.
          {/*<IntlMessages id="sweetAlerts.btnClicked"/>*/}
        </SweetAlert>
      </div>
    );
  }
}

export default DetailInfo;