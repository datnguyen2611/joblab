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
import EducationEdit from './EducationEdit';
import { toggleEducationEdit } from 'actions/Status';  
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';

class EducationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isDeleteWarning: false,
      isDetailExpanded: false,
      
      eduId: null,
    };
  }
  
  componentDidMount() {
    if (this.props.eduData)
      this.getEduData();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.eduData !== prevProps.eduData) 
      this.getEduData();
  }
  
  getEduData() {
    this.setState({
      eduId: this.props.eduData._id==null ? null : this.props.eduData._id, //For delete education use
      institution: this.props.eduData.institution==null ? '' : this.props.eduData.institution,
      degree: this.props.eduData.degree==null ? '' : this.props.eduData.degree,
      major: this.props.eduData.major==null ? '' : this.props.eduData.major,
      degreeYear: this.props.eduData.degreeYear==null ? null : this.props.eduData.degreeYear,
      description: this.props.eduData.description==null ? '' : this.props.eduData.description,
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      isDetailExpanded: !prevState.isDetailExpanded
    }));
  }
  
  startEdit = () => {
    this.setState({ isEdit: true });
    this.props.toggleEducationEdit(true);
  }
  
  cancelEdit = () => {
    this.setState({ isEdit: false });
    this.props.toggleEducationEdit(false);
  }
  
  deleteItem = () => {
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
      eduId: this.state.eduId,
    };
    axios.post('/api/candidates/set/profile/education/delete', data)
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
    const image = 'graduation-cap';
    const userRole = this.props.userRole;
    const { institution, degree, /*major,*/ degreeYear, description } = this.props.eduData;
    const { refresh } = this.props;
    const { isEducationEditing } = this.props;
    const { isEdit, isDeleteWarning, isDetailExpanded } = this.state;
    
    return (
      <div className="media social-list-line">
        <Avatar className={`${color} z-index-20 size-40 align-item-self mr-3`}>
          <i className={`zmdi zmdi-${image} text-white`}/>
        </Avatar>
        { (userRole=="candidate" || userRole=="admin") && isEdit ?
          <EducationEdit candidateData={this.props.candidateData} eduData={this.props.eduData} cancel={this.cancelEdit} refresh={refresh} />
          :
          <div className="media-body">
            <div className="d-flex">
              <h5 className="mr-auto mb-1 font-weight-bold">{institution}</h5>
                { (userRole=="candidate" || userRole=="admin") && !isEducationEditing && 
                  <IconButton className="icon-btn text-dark mt-n3 mr-n2" onClick={this.startEdit}>
                    <i class="zmdi zmdi-edit"/>
                  </IconButton>
                }
                { (userRole=="candidate" || userRole=="admin") && !isEducationEditing && 
                  <IconButton className="icon-btn text-dark mt-n3 mr-n2" onClick={() => this.setState({ isDeleteWarning: true })}>
                    <i class="zmdi zmdi-delete"/>
                  </IconButton>
                }
            </div>
            <h5 className="mb-1">{degree}{/*, {major}*/}</h5>
            <span className="meta-date meta-date-light mb-3  w-75">{degreeYear /*degreeDate==null? '':moment(degreeDate).format("YYYY/MM/DD")*/}</span>
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
  const { isEducationEditing } = state.status;
  return { isEducationEditing }
};

const mapDispatchToProps = {
  toggleEducationEdit,
  requestInitUser,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EducationItem));
