import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';
import {SPECIALITY_LENGTH} from 'constants/AutoSuggest';

class SkillEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speciality: [],
      //skill: [],
      language: [],
    };
  }
  
  componentDidMount() {
    if (this.props.candidateData)
      this.setState({
        //speciality: (this.props.specData==null) ? [] : this.props.specData.map(obj => { return { value: obj._id, label: obj.name } }),
        speciality: this.props.specData ?
          (this.props.specData==null) ? [] : this.props.specData
        :
          (this.props.candidateData.speciality==null) ? [] : this.props.candidateData.speciality,
        //skill: (this.props.skillData==null) ? [] : this.props.skillData,
        language: this.props.langData ?
          (this.props.langData==null) ? [] : this.props.langData.map(obj => { return { value: obj._id, label: obj.name } })
        :
          (this.props.candidateData.language==null) ? [] : this.props.candidateData.language.map(obj => { return { value: obj._id, label: obj.name } }),
      });
  }
  
  autocompleteChange = (e, value, name) => {
    //var name = e.target.id.split('-')[0];
    this.setState({ [name]: value });
  }
  
  autocompleteTextChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  editSave = () => {
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
      //speciality: this.state.speciality.map(obj => obj.value),
      speciality: this.state.speciality,
      //skill: this.state.skill,
      language: this.state.language.map(obj => obj.value),
    };
    axios.post('/api/candidates/set/profile/skill/update', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        this.props.refresh();
        //this.props.requestInitUser();
        notification.success("Your Profile has been updated successfully.");
        this.props.cancel(); 
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
    const { speciality, skill, language } = this.state;
    const { specialityList, languageList } = this.props;
    const { isUploadEdit } = this.props;
    
    return (
      <div>
        <p>Specialities (Max 20)</p>
        <ul className="list-inline list-inline-3">
          <Autocomplete
            multiple
            id="speciality"
            open={this.state.specialityText !=null ? (this.state.specialityText.length >= SPECIALITY_LENGTH ? true : false) : false}
            options={specialityList}
            //getOptionLabel={option => option.label}
            value={speciality}
            autoHighlight={true}
            blurOnSelect={'touch'}
            filterSelectedOptions={true}
            freeSolo
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Specialities"
                placeholder=""
                fullWidth
                error={!(speciality.length>0 && speciality.length<21)}
                helperText={!(speciality.length>0) ? "Please select Specialities." : (!(speciality.length<21) ? "No. of speciality exceeds maximum number of 20." : "")}
              />
            )}
            onChange={(e, value) => this.autocompleteChange(e, value, 'speciality')}
            onInputChange={(e, value) => this.autocompleteTextChange(e, value, 'specialityText')}
          />  
        </ul>
        
        {/*<p>Other Skills</p>
        <ul className="list-inline list-inline-3">
          <Autocomplete
            multiple
            //value={this.state.skill}
            id="skill"
            value={skill}
            freeSolo
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label=""
                placeholder=""
                fullWidth
              />
            )}
            onChange={(e, value) => this.autocompleteChange(e, value, 'skill')}
          />
        </ul>*/}
        
        <p>Languages (Max 5)</p>
        <ul className="list-inline list-inline-3">
          <Autocomplete
            multiple
            id="language"
            options={languageList}
            getOptionLabel={option => option.label}
            //value={language}
            value={languageList.filter(item => (language ? language : []).find(i => i.value === item.value))}
            autoHighlight={true}
            blurOnSelect={'touch'}
            filterSelectedOptions={true}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Languages"
                placeholder=""
                fullWidth
                error={!(language.length>0 && language.length<6)}
                helperText={!(language.length>0) ? "Please select Languages." : (!(language.length<6) ? "No. of language exceeds maximum number of 5." : "")}
              />
            )}
            onChange={(e, value) => this.autocompleteChange(e, value, 'language')}
          />  
        </ul>
        
        <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}> { isUploadEdit ? "Replace" : "Save" }</Button>
        <Button className="mt-2 mr-2" onClick={this.props.cancel}>Cancel</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { specialityList, languageList } = state.list;
  return { 
    specialityList, 
    languageList
  };
};

const mapDispatchToProps = {
  requestInitUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkillEdit));
