import React, {Component} from "react";
import Widget from "components/Widget";
import IconButton from '@material-ui/core/IconButton'
//import WidgetHeader from "components/WidgetHeader/index";
import Button from '@material-ui/core/Button';
import SkillEdit from './SkillEdit';
//import Chip from '@material-ui/core/Chip';

class SkillTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }
  
  componentDidMount() {
    if (this.props.isEdit)
      this.setState({ isEdit: this.props.isEdit });
  }
  
  editCancel = () => {
    this.setState({ isEdit: false })
  }
  
  render() {
    const userRole = this.props.userRole;
    const { speciality, /*skill,*/ language } = this.props.candidateData;
    const { getUserData } = this.props;
    const { isEdit } = this.state;
    const { isUploadEdit, cancelUploadEdit, uploadedCV } = this.props;
    
    return (
      <div className="jr-entry-sec">
        <Widget styleName="jr-card-profile">
          <div className="d-flex">
            <h3 className="card-title mr-auto mb-1 mb-md-3">Specialities and Languages</h3>
            { (userRole=="candidate" || userRole=="admin") && !isEdit &&
              <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => this.setState({ isEdit: true })}>
                <i class="zmdi zmdi-edit"/>
              </IconButton>
            }
          </div>
          
          { (userRole=="candidate" || userRole=="admin") && isUploadEdit && 
            <div className="border border-info rounded w-100 p-2 mb-2">
              <h3 className="card-heading text-info">Extracted from Resume</h3>
              <SkillEdit isUploadEdit={isUploadEdit} candidateData={this.props.candidateData} specData={uploadedCV && uploadedCV.speciality} /*skillData={uploadedSkill}*/ langData={uploadedCV && uploadedCV.language} cancel={cancelUploadEdit} refresh={getUserData} />
            </div>
          }
          
          { (userRole=="candidate" || userRole=="admin") && isEdit && !isUploadEdit ? 
            <SkillEdit candidateData={this.props.candidateData} cancel={this.editCancel} refresh={getUserData} />
            :
            <div>
              <p>Specialities</p>
              <ul className="list-inline list-inline-3">
                {speciality.map((spec, index) =>
                  <li key={index} className="list-inline-item mr-0 mb-2">
                    <Button variant="contained" className="jr-btn jr-btn-lg bg-white">{spec}</Button>
                  </li>
                )}
              </ul>
              
              {/*<p>Other Skills</p>
              <ul className="list-inline list-inline-3">
                {skill.map((skill, index) =>
                  <li key={index} className="list-inline-item mr-0 mb-2">
                    <Button variant="contained" className="jr-btn jr-btn-lg bg-white">{skill}</Button>
                  </li>
                )}
              </ul>*/}
              
              <p>Languages</p>
              <ul className="list-inline list-inline-3">
                {language.map((lang, index) =>
                  <li key={index} className="list-inline-item mr-0 mb-2">
                    <Button variant="contained" className="jr-btn jr-btn-lg bg-white">{lang.name}</Button>
                  </li>
                )}
              </ul>
            </div>
          }
        </Widget>
      </div>
    )
  }
};

export default SkillTag;