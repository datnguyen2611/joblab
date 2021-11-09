import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CareerItem from './CareerItem';
import CareerEdit from './CareerEdit';
import { toggleCareerEdit } from 'actions/Status'; 

class Career extends Component /* = ({careerData}) =>*/ {
  //const {image, title, description, date, color} = recentData;
  /*const color = 'blue';
  const image = 'case';
  const {jobTitle, company, country, startDate, endDate, description} = this.props.careerData;*/

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
    //this.props.dispatch(toggleCareerEdit(true));
    this.props.toggleCareerEdit(true);
  }
  
  cancelAdd = () => {
    console.log("Cancel Add")
    this.setState({ isAdd: false });
    this.props.toggleCareerEdit(false);
  }
  
  
  render() {
    const color = 'blue';
    const image = 'case';
    const { isAdd } = this.state;
    const { isCareerEditing } = this.props;
    const userRole = this.props.userRole;
    const { career } = this.props.candidateData;
    const { getUserData } = this.props;
    const { uploadedCV, isUploadEdit, cancelUploadEdit } = this.props;
    
    return (
      <div className="jr-card">
        <div className="jr-card-header d-flex align-items-start">
          <div className="mr-auto">
            <h3 className="card-heading">Career</h3>
            {/*<p className="sub-heading">{subHeading}</p>*/}
          </div>
          
          { (userRole=="candidate" || userRole=="admin") && !isAdd && !isCareerEditing &&
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
            <CareerEdit candidateData={this.props.candidateData} cancel={this.cancelAdd} refresh={getUserData} />
          </div>
        }
        
        { (userRole=="candidate" || userRole=="admin") && (isUploadEdit.includes(true) &&
          <div className="border border-info rounded w-100 p-2 mb-2">
            <h3 className="card-heading text-info">AI Generated</h3>
            {/*<UploadedCareerEdit newCareer={newCareer} />*/}
            { uploadedCV && uploadedCV.career && uploadedCV.career.map((career, index)=> 
              isUploadEdit[index] && <CareerEdit index={index} candidateData={this.props.candidateData} careerData={career} cancel={() => cancelUploadEdit(index)} refresh={getUserData} />
            )}
          </div>
        )}
        
        { career.map((career, index) => 
          <CareerItem key={index} userRole={userRole} candidateData={this.props.candidateData} careerData={career} refresh={getUserData} />)
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { isCareerEditing } = state.status;
  return { isCareerEditing }
};


const mapDispatchToProps = {
  toggleCareerEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(Career);
