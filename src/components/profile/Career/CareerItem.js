import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from 'util/IntlMessages';
import Detail from './Detail';
import CareerEdit from './CareerEdit';
import { toggleCareerEdit } from 'actions/Status';  
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';

class CareerItem extends Component /* = ({careerData}) =>*/ {
  //const {image, title, description, date, color} = recentData;
  /*const color = 'blue';
  const image = 'case';
  const {jobTitle, company, country, startDate, endDate, description} = this.props.careerData;*/

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isDeleteWarning: false,
      isDetailExpanded: false,
      
      careerId: null,
    };
  }
  
  componentDidMount() {
    if (this.props.careerData)
      this.getCareerData();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.careerData !== prevProps.careerData) 
      this.getCareerData();
  }
  
  getCareerData() {
    this.setState({ 
      careerId: this.props.careerData._id==null ? null : this.props.careerData._id, //For delete career use
      company: this.props.careerData.company==null ? '' : this.props.careerData.company,
      jobTitle: this.props.careerData.jobTitle==null ? '' : this.props.careerData.jobTitle,
      location: this.props.careerData.location==null ? '' : this.props.careerData.location,
      city: this.props.careerData.city==null ? '' : this.props.careerData.city,
      startYear: this.props.careerData.startYear==null ? null : this.props.careerData.startYear,
      startMonth: this.props.careerData.startMonth==null ? null : this.props.careerData.startMonth,
      endYear: this.props.careerData.endYear==null ? null : this.props.careerData.endYear,
      endMonth: this.props.careerData.endMonth==null ? null : this.props.careerData.endMonth,
      description: this.props.careerData.description==null ? '' : this.props.careerData.description,
      isPresent: this.props.careerData.isPresent,
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      isDetailExpanded: !prevState.isDetailExpanded
    }));
  }
  
  startEdit = () => {
    this.setState({ isEdit: true });
    this.props.toggleCareerEdit(true);
  }
  
  cancelEdit = () => {
    this.setState({ isEdit: false });
    this.props.toggleCareerEdit(false);
  }
  
  deleteItem = () => {
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
      careerId: this.state.careerId,
    };
    axios.post('/api/candidates/set/profile/career/delete', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        this.props.refresh();
        //this.props.requestInitUser();
        this.setState({ isDeleteWarning: false });
      }
      else {
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  render() {
    const color = 'blue';
    const image = 'city-alt';
    const userRole = this.props.userRole;
    const { jobTitle, company, location, city, startYear, startMonth, endYear, endMonth, description, isPresent } = this.state;//this.props.careerData;
    const { isCareerEditing } = this.props;
    const { refresh } = this.props;
    const { isEdit, isDeleteWarning, isDetailExpanded } = this.state;

    return (
      <div className="media social-list-line">
        <Avatar className={`${color} z-index-20 size-40 align-item-self mr-3`}>
          <i className={`zmdi zmdi-${image} text-white`}/>
        </Avatar>
        { (userRole=="candidate" || userRole=="admin") && isEdit ?
          <CareerEdit candidateData={this.props.candidateData} careerData={this.props.careerData} cancel={this.cancelEdit} refresh={refresh} />
          :
          <div className="media-body">
            <div className="d-flex">
              <h5 className="mr-auto mb-1 font-weight-bold">
                { location ? 
                    city ?
                      company+", "+location.name+" - "+city
                    :
                    company+", "+location.name 
                  : 
                    company
                }
              </h5>
                { (userRole=="candidate" || userRole=="admin") && !isCareerEditing && 
                  <IconButton className="icon-btn text-dark mt-n3 mr-n2" onClick={this.startEdit}>
                    <i class="zmdi zmdi-edit"/>
                  </IconButton>
                }
                { (userRole=="candidate" || userRole=="admin") && !isCareerEditing && 
                  <IconButton className="icon-btn text-dark mt-n3 mr-n2" onClick={() => this.setState({ isDeleteWarning: true })}>
                    <i class="zmdi zmdi-delete"/>
                  </IconButton>
                }
            </div>
            <h5 className="mb-1">{jobTitle}</h5>
            <span className="meta-date meta-date-light mb-3  w-75">{startYear}{startMonth && "/"+startMonth} - {isPresent ? "Now" : endYear}{!isPresent && endMonth && "/"+endMonth}{/*startDate==null? '':moment(startDate).format("YYYY/MM")} - {isPresent ? 'Now' : (endDate==null? '' : moment(endDate).format("YYYY/MM/DD"))*/}</span>
            {
              isDetailExpanded
              ?
              <Button size="small" variant="contained" className="mb-0 float-right float-sm-left float-md-right" color="primary" onClick={this.toggle}><small>Hide Detail</small></Button>
              :
              <Button size="small" variant="contained" className="mb-0 float-right float-sm-left float-md-right" color="primary" onClick={this.toggle}><small>Show Detail</small></Button>
            }
            <Detail description={description} open={isDetailExpanded}/>
          </div>
        }
        <SweetAlert show={isDeleteWarning}
                    warning
                    showCancel
                    confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt"/>}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                    onConfirm={() => this.setState(this.deleteItem)}
                    onCancel={() => this.setState({ isDeleteWarning: false })}
        >
          <IntlMessages id="sweetAlerts.youWillNotAble"/>
        </SweetAlert>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { isCareerEditing } = state.status;
  return { isCareerEditing }
};

const mapDispatchToProps = {
  toggleCareerEdit,
  requestInitUser,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CareerItem));
