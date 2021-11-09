import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { requestInitUser } from 'actions/Auth';  
import { yearList } from 'constants/List';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import * as notification from 'actions/Notification';


class EducationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eduId: null,
      institution: '',
      institutionText: '',
      degree: '',
      degreeYear: null,
      description: '',
    };
  }
  
  componentDidMount() {
    this.initEducationData();
  }
  
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (!newProps.listLoading && oldProps.listLoading) {
      this.initEducationData();
    }
  }
  
  initEducationData = () => {
    if (!this.props.listLoading) {
      var institutionTemp = {};
      var institution = this.props.eduData === undefined ? '' : this.props.institutionList.find(obj => { return obj.name === this.props.eduData.institution });
      if (institution != '') {
        institutionTemp.name = this.props.eduData.institution;
        institution = institutionTemp;
      }
      if (this.props.eduData)
        this.setState({
          eduId: this.props.eduData._id==null ? null : this.props.eduData._id,
          institution: institution,
          degree: this.props.eduData.degree==null ? '' : this.props.eduData.degree,
          degreeYear: this.props.eduData.degreeYear==null ? null : yearList().find(obj => { return obj.value===this.props.eduData.degreeYear }),
          description: this.props.eduData.description==null ? '' : this.props.eduData.description,
        });
    }
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  autocompleteChange = (e, value, name) => {
    //var name = e.target.id.split('-')[0];
    this.setState({ [name]: value });
  }
  
  editSave = () => {
    var institution = (this.state.institution && this.state.institution.name && this.state.institution.name == this.state.institutionText) ? this.state.institution.name : this.state.institutionText;
    console.log(institution);
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
      eduId: this.state.eduId,
      institution: institution,
      degree: this.state.degree,
      degreeYear: this.state.degreeYear==null ? null : this.state.degreeYear.value,
      description: this.state.description,
    };
    axios.post('/api/candidates/set/profile/education/update', data)
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
    const { institution, institutionText, degree, degreeYear, description } = this.state;
    const { institutionList } = this.props;
    
    const filterOptions = createFilterOptions({
          matchFrom: 'any',
          stringify: option => ((option.name ? option.name : "")),
          });
          
    return (
      <div className="media-body">
        <div className="row">
          <div className="col-md-6 col-12">
            {/*
            <TextField
              name="institution"
              label="Institution"
              value={institution}
              onChange={this.textboxChange}
              fullWidth
            />*/}
            <Autocomplete
              value={institution}
              options={institutionList ? institutionList : []}
              getOptionLabel={option => option.name}
              filterOptions={filterOptions}
              freeSolo
              //id="institution"
              name="institution"
              defaultValue={this.state.institutionText}
              autoHighlight={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="Institution" 
                  fullWidth 
                  //error={!(institution || institutionText)}
                  //helperText={!(institution || institutionText) && "Required"}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'institution')}
              onInputChange={(e, value) => this.autocompleteChange(e, value, 'institutionText')}
            />
          
          </div>
          <div className="col-md-6 col-12">
            <TextField
              name="degree"
              label="Degree"
              placeholder="eg. Master of Business Administration"
              value={degree}
              onChange={this.textboxChange}
              fullWidth
              //error={!degree}
              //helperText={!degree && "Required"}
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <Autocomplete
              id="degreeYear"
              value={degreeYear}
              options={yearList()}
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="Degree Year" 
                  fullWidth 
                  //error={!degreeYear}
                  //helperText={!degreeYear && "Required"}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'degreeYear')}
            />
          </div>
          <div className="col-12 mt-2">
           
            <TextField
                  className="jobTextArea"
                  name="description"
                  label="Description"
                  fullWidth
                  multiline={true}
                  variant="outlined"
                  value={description}
                  onChange={this.textboxChange}
                />
                {/*
                 <label className="m-0">Description</label>
                <Textarea useCacheForDOMMeasurements className="w-100" name="description" placeholder="Please input your description..." value={description} onChange={this.textboxChange} />
                */}
            
          </div>
        </div>
        <div className="mt-2 mb-2 d-flex">
          <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
          <Button className="mt-2 mr-2 mr-auto" onClick={this.props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { listLoading, institutionList } = state.list;
  return { 
    listLoading,
    institutionList }
};

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EducationEdit));
