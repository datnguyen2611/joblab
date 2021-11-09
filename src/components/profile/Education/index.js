import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import EducationItem from "./EducationItem";
import EducationEdit from "./EducationEdit";
import { toggleEducationEdit } from 'actions/Status'; 

class Education extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
    };
  }
  
  /******* For Complete Registration Use *******/ 
  componentDidMount() {
    if (this.props.isAdd)
      this.setState({ isAdd: this.props.isAdd });
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.isAdd !== prevProps.isAdd) {
      this.setState({ isAdd: this.props.isAdd });
    }
  }
  /********************************************/
  
  startAdd = () => {
    this.setState({ isAdd: true });
    this.props.toggleEducationEdit(true);
  }
  
  cancelAdd = () => {
    console.log("Cancel Add")
    this.setState({ isAdd: false });
    this.props.toggleEducationEdit(false);
  }
  
  render() {
    const color = 'black';
    const image = 'graduation-cap';
    const { isAdd } = this.state;
    const { isEducationEditing } = this.props;
    const userRole = this.props.userRole;
    const { education } = this.props.candidateData;
    const { getUserData } = this.props;
    const { uploadedCV, isUploadEdit, cancelUploadEdit } = this.props;
    
    return (
      <div className="jr-card">
        <div className="jr-card-header d-flex align-items-start">
          <div className="mr-auto">
            <h3 className="card-heading">Education</h3>
            {/*<p className="sub-heading">{subHeading}</p>*/}
          </div>
          
          { (userRole=="candidate" || userRole=="admin") && !isAdd && !isEducationEditing && 
            <Button className="jr-btn mt-n1 mr-n2" color="primary" onClick={this.startAdd}>
              <i className="zmdi zmdi-plus zmdi-hc-lg"/>
              <span>Add New</span>
            </Button>
          }
        </div>
        
        { (userRole=="candidate" || userRole=="admin") && isAdd &&
          <div className="media social-list-line">
            <Avatar className={`${color} z-index-20 size-40 align-item-self mr-3`}>
              <i className={`zmdi zmdi-${image} text-white`}/>
            </Avatar>
            {<EducationEdit candidateData={this.props.candidateData} cancel={this.cancelAdd} refresh={getUserData} />}
          </div>
        }
        
        { (userRole=="candidate" || userRole=="admin") && (isUploadEdit.includes(true) &&
          <div className="border border-info rounded w-100 p-2 mb-2">
            <h3 className="card-heading text-info">AI Generated</h3>
            { uploadedCV && uploadedCV.education && uploadedCV.education.map((edu, index)=> 
              isUploadEdit[index] && <EducationEdit index={index} candidateData={this.props.candidateData} eduData={edu} cancel={() => cancelUploadEdit(index)} refresh={getUserData} />
            )}
          </div>
        )}
        
        { education.map((edu, index) => 
          <EducationItem key={index} userRole={userRole} candidateData={this.props.candidateData} eduData={edu} refresh={getUserData} />)
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { isEducationEditing } = state.status;
  return { isEducationEditing }
};


const mapDispatchToProps = {
  toggleEducationEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(Education);
