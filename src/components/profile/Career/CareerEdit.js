import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Textarea from 'react-textarea-autosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import * as notification from 'actions/Notification';

import { requestInitUser } from 'actions/Auth';  

import { yearList, monthList } from 'constants/List';


class CareerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careerId: null,
      company: '',
      companyText: '',
      jobTitle: '',
      location: null,
      city: null,
      startYear: null,//{ value: new Date().getFullYear(), label: (new Date().getFullYear()).toString() },
      startMonth: null,//{ value: 1, label: "Jan" },
      endYear: null,//{ value: new Date().getFullYear(), label: (new Date().getFullYear()).toString() },
      endMonth: null,//{ value: 1, label: "Jan" },
      description: '',
      isPresent: true,
    };
  }
  
  componentDidMount() {
    this.initCareerData();
  }
  
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if(!newProps.listLoading && oldProps.listLoading) {
      this.initCareerData();
    }
  }
  
  initCareerData = () => {
    if(!this.props.listLoading) 
    {
      var companyTemp = {};
      var company = this.props.careerData === undefined ? '' : this.props.companyList.find(obj => { return obj.name === this.props.careerData.company });
      if(company !='')
      {
        companyTemp.name = this.props.careerData.company;
        company = companyTemp;
      }
      if (this.props.careerData)
      this.setState({
        careerId: this.props.careerData._id==null ? null : this.props.careerData._id,
        //companyText: this.props.careerData.company==null ? '' : this.props.careerData.company,
        company: company,
        jobTitle: this.props.careerData.jobTitle==null ? '' : this.props.careerData.jobTitle,
        location: this.props.careerData.location==null ? null : this.props.countryList.find(obj => { return obj.value===this.props.careerData.location._id }),
        description: this.props.careerData.city==null ? '' : this.props.careerData.city,
        startYear: this.props.careerData.startYear==null ? null : yearList().find(obj => { return obj.value===this.props.careerData.startYear }),
        startMonth: this.props.careerData.startMonth==null ? null : monthList.find(obj => { return obj.value===this.props.careerData.startMonth }),
        endYear: this.props.careerData.endYear==null ? null : yearList().find(obj => { return obj.value===this.props.careerData.endYear }),
        endMonth: this.props.careerData.endMonth==null ? null : monthList.find(obj => { return obj.value===this.props.careerData.endMonth }),
        description: this.props.careerData.description==null ? '' : this.props.careerData.description,
        isPresent: this.props.careerData.isPresent,
      });
    }
  }
  
  /*componentWillUnmount() {
    console.log("Deleted Career "+this.state);
  }
  
  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate start");
    console.log(this.props.careerData);
    console.log(prevProps.careerData);
    if (this.props.careerData !== prevProps.careerData) {
      this.setState({ 
        careerId: this.props.careerData._id==null ? null : this.props.careerData._id,
        company: this.props.careerData.company==null ? '' : this.props.careerData.company,
        jobTitle: this.props.careerData.jobTitle==null ? '' : this.props.careerData.jobTitle,
        startYear: this.props.careerData.startYear==null ? null : yearList().find(obj => { return obj.value===this.props.careerData.startYear }),
        startMonth: this.props.careerData.startMonth==null ? null : monthList.find(obj => { return obj.value===this.props.careerData.startMonth }),
        endYear: this.props.careerData.endYear==null ? null : yearList().find(obj => { return obj.value===this.props.careerData.endYear }),
        endMonth: this.props.careerData.endMonth==null ? null : monthList.find(obj => { return obj.value===this.props.careerData.endMonth }),
        description: this.props.careerData.description==null ? '' : this.props.careerData.description,
        isPresent: this.props.careerData.isPresent,
      });
    }
  }*/
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  autocompleteChange = (e, value, name) => {
    //var name = e.target.id.split('-')[0];
    this.setState({ [name]: value });
  }
  
  handleSwitchChange = (e, checked) => {
    this.setState({ [e.target.name]: checked });
    if (e.target.name=='isPresent' && checked==true)
      this.setState({
        endYear: null,
        endMonth: null,
        isEndYearInput: false,
        isEndMonthInput: false
      })
  };
  
  editSave = () => {
    console.log(this.state.companyText);
    var company = (this.state.company && this.state.company.name && this.state.company.name == this.state.companyText) ? this.state.company.name : this.state.companyText;
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id, //this.props.match.params.Id,
      careerId: this.state.careerId,
      company: company,
      jobTitle: this.state.jobTitle,
      location: this.state.location && this.state.location.value,
      city: this.state.city,
      startYear: this.state.startYear==null ? null : this.state.startYear.value,
      startMonth: this.state.startMonth==null ? null : this.state.startMonth.value,
      endYear: this.state.endYear==null ? null : this.state.endYear.value,
      endMonth: this.state.endMonth==null ? null : this.state.endMonth.value,
      description: this.state.description,
      isPresent: this.state.isPresent
    };
    axios.post('/api/candidates/set/profile/career/update', data)
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
    const { jobTitle, company, companyText, location, city, startYear, startMonth, endYear, endMonth, description, isPresent } = this.state;
    const { companyList, countryList } = this.props;
    
    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      stringify: option => ((option.name ? option.name : "")),
    });
    
    return (
      <div className="media-body row">
        <div className="col-md-6 col-12">
        {/*
        <TextField
            //id="company"
            name="company"
            label="Company"
            value={company}
            onChange={this.textboxChange}
            fullWidth
          />
        */}
          
          <Autocomplete
            name="company"
            value={company}
            options={companyList ? companyList : []}
            getOptionLabel={option => option.name}
            filterOptions={filterOptions}
            freeSolo
            //id="company"
            defaultValue={companyText}
            autoHighlight={true}
            blurOnSelect={true}
            renderInput={params => (
              <TextField 
                {...params} 
                label="Company" 
                fullWidth
                error={!(company || companyText)}
                helperText={!(company || companyText) && "Required"}
              />
              /*
               <InputBase ref={params.InputProps.ref}
                inputProps={params.inputProps} placeholder="Company" className="form-control form-control-lg employer" />
              */
             
            )}
            onChange={(e, value) => this.autocompleteChange(e, value, 'company')}
            onInputChange={(e, value) => this.autocompleteChange(e, value, 'companyText')}
          />
        </div>
        <div className="col-md-6 col-12">
          <TextField
            //id="jobTitle"
            name="jobTitle"
            label="Job Title"
            value={jobTitle}
            onChange={this.textboxChange}
            fullWidth
            error={!jobTitle}
            helperText={!jobTitle && "Required"}
          />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <Autocomplete
                id="startYear"
                value={startYear}
                options={yearList()}
                getOptionLabel={option => option.label}
                autoHighlight={true}
                blurOnSelect={true}
                renderInput={params => (
                  <TextField 
                    {...params} 
                    label="Start Year" 
                    fullWidth 
                    error={!startYear}
                    helperText={!startYear && "Required"}
                  />
                )}
                onChange={(e, value) => this.autocompleteChange(e, value, 'startYear')}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <Autocomplete
                id="startMonth"
                value={startMonth}
                options={monthList}
                getOptionLabel={option => option.label}
                autoHighlight={true}
                blurOnSelect={true}
                renderInput={params => (
                  <TextField 
                    {...params} 
                    label="Start Month" 
                    fullWidth 
                    error={!startMonth}
                    helperText={!startMonth && "Required"}
                  />
                )}
                onChange={(e, value) => this.autocompleteChange(e, value, 'startMonth')}
              />
            </div>
            { !isPresent && 
              <div className="col-lg-3 col-md-6 col-12">
                <Autocomplete
                  id="endYear"
                  value={endYear}
                  options={yearList(startYear)}
                  getOptionLabel={option => option.label}
                  autoHighlight={true}
                  blurOnSelect={true}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      label="End Year" 
                      fullWidth 
                      error={!endYear}
                      helperText={!endYear && "Required"}
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'endYear')}
                />
              </div>
            }
            { !isPresent && 
              <div className="col-lg-3 col-md-6 col-12">
                <Autocomplete
                  id="endMonth"
                  value={endMonth}
                  options={monthList}
                  getOptionLabel={option => option.label}
                  autoHighlight={true}
                  blurOnSelect={true}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      label="End Month" 
                      fullWidth 
                      error={!endMonth}
                      helperText={!endMonth && "Required"}
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'endMonth')}
                />
              </div>
            }
          </div>
        </div>
        <div className="col-md-6 col-12">
          <Autocomplete
            value={location}
            options={countryList}
            getOptionLabel={option => option.label}
            autoHighlight={true}
            blurOnSelect={true}
            renderInput={params => (
              <TextField 
                {...params} 
                label="Location" 
                fullWidth 
                error={!location}
                helperText={!location && "Required"}
              />
            )}
            onChange={(e, value) => this.autocompleteChange(e, value, 'location')}
          />
        </div>
        <div className="col-md-6 col-12">
          <TextField
            //id="jobTitle"
            name="city"
            label="City"
            value={city}
            onChange={this.textboxChange}
            fullWidth
          />
        </div>
        <div className="col-12 mt-3 ml-auto">
          <FormControlLabel
            control={
              <Switch name="isPresent"
                      color="primary"
                      classes={{
                        checked: 'text-primary',
                        //bar: 'bg-primary',
                      }}
                      checked={isPresent}
                      onChange={(e, checked) => this.handleSwitchChange(e, checked)}
              />
            }
            label="Present"
          />
        </div>
        <div className="col-12 mt-2 mb-2">
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
          <Textarea useCacheForDOMMeasurements className="w-100 h-100" name="description" placeholder="Please input your description..." value={description} onChange={this.textboxChange} />
          */}
        </div>
        <div className="col-12 mt-2 mb-2 d-flex">
          <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
          <Button className="mt-2 mr-2 mr-auto" onClick={this.props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { listLoading, companyList, countryList } = state.list;
  return { 
    listLoading,
    companyList,
    countryList
  }
};

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CareerEdit));
