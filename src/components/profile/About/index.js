import React from "react";
import Widget from "components/Widget/index";
import IconButton from '@material-ui/core/IconButton';
import AboutEdit from "./AboutEdit";
import AboutItem from "./AboutItem";
import { numberWithCommas } from 'actions/Function.js';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }
  
  editCancel = () => {
    this.setState({ isEdit: false })
  }
  
  render() {
    const userRole = this.props.userRole;
    const { address, location, openToRelocation, industry, subIndustry, salary, bonus, experience, noticePeriod, openToOpportunity } = this.props.candidateData;
    const { getUserData } = this.props;
    const { isEdit } = this.state;
    const { uploadedCV, isUploadEdit, cancelUploadEdit } = this.props;
    
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header d-flex">
          <h4 className="card-title mr-auto mt-2 mb-1">About</h4>
          { (userRole=="candidate" || userRole=="admin") && !isEdit &&
            <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => this.setState({ isEdit: true })}>
              <i className="zmdi zmdi-edit"/>
            </IconButton>
          }
        </div>
        <div className="jr-tabs-classic">
          <div className="jr-tabs-content jr-task-list">
          { (userRole=="candidate" || userRole=="admin") && isUploadEdit && 
            <div className="border border-info rounded w-100 p-2 mb-2">
              <h3 className="card-heading text-info">Extracted from Resume</h3>
              <AboutEdit isUploadEdit={isUploadEdit} candidateData={this.props.candidateData} locData={uploadedCV && uploadedCV.location} indData={uploadedCV && uploadedCV.industry} expData={uploadedCV && uploadedCV.experience} cancel={cancelUploadEdit} refresh={getUserData} />
            </div>
          }
          
          { (userRole=="candidate" || userRole=="admin") && isEdit && !isUploadEdit ?
            <AboutEdit candidateData={this.props.candidateData} cancel={this.editCancel} refresh={getUserData} />
            :
            <div className="row">
              {/*<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Work At", icon: "city-alt", desc: [company]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Went to", icon: "graduation-cap", desc: [education[0].institutionName]} }/>
              </div>*/}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Lives in", icon: "home", desc: [(address && address.city ? address.city+", " : "") + (location ? location.name : "")]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Industry", icon: "case", desc: [industry && industry.name]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Job Function", icon: "wrench", desc: [subIndustry && subIndustry.name]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Relocation", icon: "globe", desc: [openToRelocation ? "Open" : "Not Open"]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Monthly Salary (HKD)", icon: "money-box", desc: [salary && "$"+numberWithCommas(salary)]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Most Recent Bonus (HKD)", icon: "card-giftcard", desc: [bonus && "$"+numberWithCommas(bonus)]} }/>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <AboutItem data={ { title: "Year of Experience", icon: "time", desc: [experience]} }/>
              </div>
              { openToOpportunity &&
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <AboutItem data={ { title: "Notice Period (in Months)", icon: "calendar-note", desc: [noticePeriod]} }/>
                </div>
              }
            </div>
          }
          </div>
        </div>
      </Widget>
    );
  }
}


export default About;
