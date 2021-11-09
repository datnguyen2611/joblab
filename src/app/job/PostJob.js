import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import {SPECIALITY_LENGTH} from 'constants/AutoSuggest';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerHeader from 'components/ContainerHeader';
import Widget from "components/Widget";
import TextField from '@material-ui/core/TextField';
import InputSalary from 'components/InputNumber/InputSalary';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TreeSelect, { SHOW_PARENT } from 'rc-tree-select';
import 'rc-tree-select/assets/index.css';
import axios from "axios";
import Button from '@material-ui/core/Button';
import * as notification from 'actions/Notification';
import { Helmet } from 'react-helmet';

class PostJob extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loader : true,
      isUpdate: false,
      isFormLoading: false,
      
      jobTitle:"",
      salary: '',
      experience: '',
      company: null,
      client: [],
      location: null,
      city: null,
      //jobCategory: [],
      majorLanguage: [],
      minorLanguage: [],
      majorSpeciality: [],
      minorSpeciality: [],
      jobSummary:'',
      jobResponsibilities:'',
      jobRequirements:'',
      exposeCompanyName: false,
      exposeSalary: true,
      careerExpertInsight: '',
      treeIndustry:[],
      client_list: [],
      isOpen: true,
      isExclusive: false,
    }
  }
    
  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.initJobData();
    /*
    const clientDataSet = axios.get('/api/admins/get/client/list');
    clientDataSet.then(result => {
      if(result.data.isSuccess && (result.data.client_list != null))
        this.setState({client_list : Object.assign([], result.data.client_list)});
    })
    
    setTimeout(() => {
      this.setState({ loader: false });
    }, 500);
    */
  }
  
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if(!newProps.listLoading && oldProps.listLoading) {
      this.initJobData();
    }
  }
  
  initJobData = () => {
    if(!this.props.listLoading) 
    {
      if (this.props.match.params.jobId != null) {
        var jobId = this.props.match.params.jobId;
        axios.get('/api/jobs/get/job/'+jobId)
        .then(res => {
          if (res.data.isSuccess) {
            var companyList = this.props.companyList ? this.props.companyList : [];
            this.setState({
              isOpen: (res.data.job.isOpen==null) ? true : res.data.job.isOpen,
              isExclusive: (res.data.job.isExclusive==null) ? true : res.data.job.isExclusive,
              jobTitle : (res.data.job.jobTitle==null) ? '' : res.data.job.jobTitle,
              company: (res.data.job.company == null) ? '' : companyList.find(obj => { return obj.name===res.data.job.company }),
              client: (res.data.job.client==null) ? [] : res.data.job.client,
              exposeCompanyName: (res.data.job.isPublic == null) ? false : res.data.job.isPublic,
              exposeSalary: (res.data.job.isSalaryPublic == null) ? true : res.data.job.isSalaryPublic,
              ///jobCategory: (res.data.job.category==null) ? [] : res.data.job.category.map(obj => { return { value: obj._id, label: obj.name } }),
              //jobCategory:this.props.jobCategoryList.filter(item => res.data.job.category.find(i => i._id === item.value)),
              location: (res.data.job.location==null) ? null : { value: res.data.job.location._id, label: res.data.job.location.name },
              city: res.data.job.address && res.data.job.address.city ? res.data.job.address.city : null,
              //industry: (res.data.job.industry==null) ? null : { value: res.data.job.industry._id, label: res.data.job.industry.name },
              treeIndustry: (res.data.industryTreeList==null) ? [] : res.data.industryTreeList,
              //subIndustry: (res.data.job.subIndustry==null) ? null : { value: res.data.job.subIndustry._id, label: res.data.job.subIndustry.name },
              salary: (res.data.job.salaryMax==null) ? 0 : res.data.job.salaryMax,
              experience: (res.data.job.yearMin==null) ? 0 : res.data.job.yearMin,
              majorSpeciality: (res.data.job.speciality.major==null) ? [] : res.data.job.speciality.major.map(obj => { return obj }),//this.state.speciality_list.filter(obj => { return obj.value === spec._id })[0])
              minorSpeciality: (res.data.job.speciality.minor==null) ? [] : res.data.job.speciality.minor.map(obj => { return obj }),//this.state.speciality_list.filter(obj => { return obj.value === spec._id })[0])
              majorLanguage: (res.data.job.languageProf.major==null) ? [] : this.props.languageList.filter(item => res.data.job.languageProf.major.find(i => i._id === item.value)),//res.data.job.languageProf.major.map(obj => { return { value: obj._id, label: obj.name } }),//this.state.language_list.filter(obj => { return obj.value === lang._id })[0])
              minorLanguage: (res.data.job.languageProf.minor==null) ? [] : this.props.languageList.filter(item => res.data.job.languageProf.minor.find(i => i._id === item.value)),//res.data.job.languageProf.minor.map(obj => { return { value: obj._id, label: obj.name } }),//this.state.language_list.filter(obj => { return obj.value === lang._id })[0])
              jobSummary: (res.data.job.summary==null) ? '' : res.data.job.summary,
              jobResponsibilities: (res.data.job.responsibility==null) ? "" : res.data.job.responsibility.join("\n"),
              jobRequirements: (res.data.job.requirement==null) ? "" : res.data.job.requirement.join("\n"),
              careerExpertInsight: (res.data.job.expertInsight==null) ? "" : res.data.job.expertInsight.content,
              isUpdate: true,
            }, () => {
                this.updateClientList(res.data.job.company);
                //
            });
          }
          else {
            alert("This job does not exist anymore.");
          }
        })
        .catch(function (err) {
          console.log(err);
          //e.preventDefault();
        });
      }
      this.setState({loader: false });
    }
  }
  
  textboxChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    });
    //console.log(e.target)
  }
  
  handleNumberInputChange = (e) => {
    
    var val = e.target.value.replace(/\D/g,'');
    this.setState({
      [e.target.name]: val,
    });
  };
  
  autocompleteChange = (e, value, name) => {
    if(name == 'company' && value)
      this.updateClientList(value.name)
    console.log(value);
    this.setState({ [name]: value });
  }
  
  autocompleteTextChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  updateClientList = (companyName) => {
    var data = {};
    if(companyName)
      data = {company : companyName};
    axios.post('/api/admins/get/client/list/more', data)
      .then(resp => {
        if(resp.data.isSuccess)
        {
          var clientIdList = this.state.client.map(item => item._id._id);
          var clientList = resp.data.client_list.filter(obj => { return clientIdList.indexOf(obj._id._id) > -1});
          this.setState({ 
            client_list: resp.data.client_list,
            client: (clientIdList.length > 0) ? clientList: [],
          });
          console.log(this.state.client);
        }
      })
  }
  
  handleSwitchChange = (e, checked) => {
    this.setState({ [e.target.name]: checked });
  };
  
  onTreeChange = (value, ...rest) => {
    //console.log('onChange', value, ...rest);
    this.setState({ treeIndustry:value });
    //console.log(value);
  };
  
 /* onSearch = (value, ...args) => {
    //console.log('Do Search:', value, ...args);
    this.setState({ treeSearchValue: value });
  };*/
  formSubmit = (e) => {
    e.preventDefault();

    //this.setState({ isFormLoading: true });
    //console.log(this.state.majorSpeciality);
    const data = {
      isOpen: this.state.isOpen,
      isExclusive: this.state.isExclusive,
      jobTitle: this.state.jobTitle,
      company: (this.state.company == null) ? "" : this.state.company.name,
      client: this.state.client==null ? [] : this.state.client.map(obj => obj._id),
      isPublic: this.state.exposeCompanyName,
      isSalaryPublic: this.state.exposeSalary,
      //category: this.state.jobCategory.map(obj => obj.value),
      location: this.state.location==null ? null : this.state.location.value,
      city: this.state.city==null ? null : this.state.city,
      industry: this.state.treeIndustry==null ? null : this.state.treeIndustry,
      //subIndustry: this.state.subIndustry==null ? null : this.state.subIndustry.value,
      salaryMax: this.state.salary,
      yearMin: this.state.experience,
      majorSpeciality: this.state.majorSpeciality,//.map(obj => obj.value), //https://cythilya.github.io/2018/06/17/array-and-object-handling/
      minorSpeciality: this.state.minorSpeciality,//.map(obj => obj.value),
      majorLanguage: this.state.majorLanguage.map(obj => obj.value),
      minorLanguage: this.state.minorLanguage.map(obj => obj.value),
      summary: this.state.jobSummary,
      responsibility: this.state.jobResponsibilities,
      requirement: this.state.jobRequirements,
      expertInsight: this.state.careerExpertInsight,
    };
    console.log(data)
    
    if (this.props.match.params.jobId != null) {
      data.jobId = this.props.match.params.jobId;
    }
    
    axios.post('/api/jobs/set/job/post', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        notification.success("You have posted a job successfully.");
        if(res.data.jobId)
          this.props.history.push('/job/'+res.data.jobId);
        //this.props.history.push('/job/'+this.props.match.params.jobId);
        //window.scrollTo(0, 0);
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
        this.setState({ isFormLoading: false });
      }
    })
    .catch(function (err) {
      console.log(err);
      //e.preventDefault();
    });
  }
  
  addPoint = (field) => {
    var point = this.state[field];
    if((point == "" || point.trim().endsWith('\n'))) // && point.trim().endsWith('•')
      point  += '• ';
    else if(!point.trim().endsWith('•'))
      point  += '\n• ';
    console.log(point);
    this.setState({
      [field] : point
    })
  }
  
  render() {
    const { loader } = this.state;
    const { isOpen, jobTitle, isExclusive, company, exposeCompanyName, client, location, city, salary, experience, jobResponsibilities, jobRequirements, jobSummary, majorSpeciality, majorLanguage, careerExpertInsight } = this.state;
    const languageList = (this.props.languageList)?this.props.languageList:[];
    const countryList = this.props.countryList ? this.props.countryList : [];
    const industry_tree_list = this.props.industry_tree_list ? this.props.industry_tree_list : [];
    //const jobCategoryList = this.props.jobCategoryList ? this.props.jobCategoryList : [];
    const companyList = this.props.companyList ? this.props.companyList : [];
    
    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      stringify: option => ((option.name ? option.name : "")),
    });
    
    return (
      <div className="app-wrapper">
      { loader ?
        <div className="loader-view"
             style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress />
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
        </div> : 
        <div style={{'width':'80%','margin': '0 auto'}} className="animated slideInUpTiny animation-duration-3">
          <Helmet>
              <title>{this.state.isUpdate?"Update Job": "Post a New Job" } | JobsLab</title>
          </Helmet>
          <ContainerHeader title={this.state.isUpdate?"Update Job": "Post a New Job" } />
          
          <Widget styleName="jr-card-profile" >
            <div className="d-flex mb-2">
              <div>
                <h3 className="card-title font-weight-bold mt-2">Job Details</h3>
              </div>
              <div className="ml-auto">
                <FormControlLabel
                  control={
                    <Switch name="isOpen"
                      color="primary"
                      classes={{
                        checked: 'text-primary'
                        //bar: 'bg-primary',
                      }}
                      className="mb-2"
                      checked={isOpen}
                      onChange={(e, checked) => this.handleSwitchChange(e, checked)}
                    />
                  }
                  label="Job Open"
                />
              </div>
            </div>
            
            <div className="row" style={{'z-index': '1'}}>
              <div className="col-md-4 mb-md-4">
                <div className="row">
                  <div className="col-12">
                    <TextField
                      name="jobTitle"
                      label="Job Title"
                      fullWidth
                      value={jobTitle}
                      onChange={this.textboxChange}
                      error={!jobTitle}
                      helperText={!jobTitle && "Required"}
                    />
                  </div>
                  <div className="col-12">
                    <FormControlLabel
                      control={
                        <Switch name="isExclusive"
                          color="primary"
                          classes={{
                            checked: 'text-primary',
                            //bar: 'bg-primary',
                          }}
                          checked={isExclusive}
                          onChange={(e, checked) => this.handleSwitchChange(e, checked)}
                        />
                      }
                      label="Exclusive"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-4 mb-md-4">
                <div className="row">
                  <div className="col-12">
                    <Autocomplete
                      value={company}
                      options={companyList ? companyList : []}
                      getOptionLabel={option => option.name}
                      filterOptions={filterOptions}
                      id="company"
                      renderInput={params => (
                        <TextField 
                          {...params} 
                          label="Company" 
                          fullWidth 
                          error={!company}
                          helperText={!company && "Required"}
                        />
                      )}
                      onChange={(e, value) => this.autocompleteChange(e, value, 'company')}
                    />
                  </div>
                  <div className="col-12">
                    <FormControlLabel
                      control={
                        <Switch name="exposeCompanyName"
                          color="primary"
                          classes={{
                            checked: 'text-primary',
                            //bar: 'bg-primary',
                          }}
                          checked={this.state.exposeCompanyName}
                          onChange={(e, checked) => this.handleSwitchChange(e, checked)}
                        />
                      }
                      label="Expose Company Name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-md-4">
                {/*<TextField
                  name="clientName"
                  label="Client Name"
                  fullWidth
                  value={clientName}
                  onChange={this.textboxChange}
                  error={!clientName}
                  helperText={!clientName && "Required"}
                />*/}
                <Autocomplete
                  multiple
                  value={client}
                  options={this.state.client_list}
                  getOptionLabel={option => ( option._id && option._id.name ? option._id.name.firstName : "" ) + " " + (option._id && option._id.name ? option._id.name.lastName : "") + " - " + (option._id && option._id.email ? option._id.email : "")}
                  id="client"
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      label="Client" 
                      placeholder="" 
                      fullWidth 
                      error={!client.length>0}
                      helperText={!client.length>0 && "Required"}
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'client')}
                />
              </div>
              {/*<div className="col-md-4 mb-md-4">
                <TextField
                  name="clientEmail"
                  label="Client Email"
                  fullWidth
                  value={clientEmail}
                  onChange={this.textboxChange}
                  error={!clientEmail}
                  helperText={!clientEmail && "Required"}
                />
              </div>*/}
              <div className="col-md-4 mb-md-4">
                <Autocomplete
                    value={location}
                    options={countryList}
                    getOptionLabel={option => option.label}
                    id="location"
                    renderInput={params => (
                      <TextField 
                        {...params} 
                        label="Location" 
                        fullWidth 
                        error={!location}
                        helperText={!location && "Please select Location."}
                      />
                    )}
                    onChange={(e, value) => this.autocompleteChange(e, value, 'location')}
                />
              </div>
              <div className="col-md-4 mb-md-4">
                <TextField
                  //id="jobTitle"
                  name="city"
                  label="City"
                  value={city}
                  onChange={this.textboxChange}
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-md-4">
                <div className="row">
                  <div className="col-12">
                    <InputSalary
                      name="salary"
                      label="Monthly Salary (Max.)"
                      fullWidth
                      value={salary}
                      onChange={this.textboxChange}
                      error={!salary}
                      helperText={!salary && "Please input Monthly Salary."}
                    />
                  </div>
                  <div className="col-12">
                    <FormControlLabel
                      control={
                        <Switch name="exposeSalary"
                          color="primary"
                          classes={{
                            checked: 'text-primary',
                            //bar: 'bg-primary',
                          }}
                          checked={this.state.exposeSalary}
                          onChange={(e, checked) => this.handleSwitchChange(e, checked)}
                        />
                      }
                      label="Expose Salary"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-md-4">
                <TextField
                  name="experience"
                  label="Year of Experience (Min.)"
                  type="number"
                  fullWidth
                  min="0"
                  value={experience}
                  onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                  onChange={this.handleNumberInputChange}
                  error={!experience}
                  helperText={!experience && "Please input Year of Experience."}
                />
              </div>
              {/*
              
              <div className="col-md-4 mb-md-4"> 
                  <p>Job Categories</p>
                  <Autocomplete
                    multiple
                    id="jobCategory"
                    options={jobCategoryList}
                    getOptionLabel={option => option.label}
                    value={this.state.jobCategory}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label=""
                        placeholder=""
                        fullWidth
                      />
                    )}
                    onChange={(e, value) => this.autocompleteChange(e, value, 'jobCategory')}
                  />  
              </div>
              */}
              
              {/*
              <Button className="jr-btn mt-n1 mr-n2" color="primary" onClick={() => this.addPoint('jobResponsibilities')}>
                  <i className="zmdi zmdi-plus zmdi-hc-lg"/>
                  <span>Add New Point</span>
              </Button>
              */}
              <div className="col-md-12 mb-md-12 mt-4">
                <TextField
                  className="jobTextArea"
                  name="jobResponsibilities"
                  label="Responsibilities"
                  fullWidth
                  multiline={true}
                  variant="outlined"
                  value={jobResponsibilities}
                  onChange={this.textboxChange}
                  error={!jobResponsibilities}
                  helperText={!jobResponsibilities && "Required"}
                />
              </div>
              {/*
              <Button className="jr-btn mt-n1 mr-n2" color="primary" onClick={() => this.addPoint('jobRequirements')}>
                  <i className="zmdi zmdi-plus zmdi-hc-lg"/>
                  <span>Add New Point</span>
              </Button>
              */}
              <div className="col-md-12 mb-md-12 mt-4">
                <TextField
                  className="jobTextArea"
                  name="jobRequirements"
                  label="Requirements"
                  fullWidth
                  multiline={true}
                  variant="outlined"
                  value={jobRequirements}
                  onChange={this.textboxChange}
                  error={!jobRequirements}
                  helperText={!jobRequirements && "Required"}
                />
              </div>
                            
              <div className="col-md-12 mb-md-12 mt-4">
                <TextField
                  className="jobTextArea"
                  name="jobSummary"
                  label="Summary"
                  fullWidth
                  multiline={true}
                  variant="outlined"
                  value={jobSummary}
                  onChange={this.textboxChange}
                  error={!jobSummary}
                  helperText={!jobSummary && "Required"}
                />
              </div>

            </div>
          </Widget>
          
          
          
          <Widget styleName="jr-card-profile">
            <div className="mb-12">
              <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Qualification Requirements</h3>
            </div>
            
            <div className="row" style={{'z-index': '1'}}>
              <div className="col-md-12 mb-md-12 mb-4 job-tree-select">
                <p>Industries</p>
                <TreeSelect
                    className="check-select"
                    transitionName="rc-tree-select-dropdown-slide-up"
                    choiceTransitionName="rc-tree-select-selection__choice-zoom"
                    dropdownStyle={{ height: 200, overflow: 'auto' }}
                    dropdownPopupAlign={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [0, 2] }}
                    placeholder={<i>Please select industries</i>}
                    //searchPlaceholder="Search Here"
                    treeLine
                    maxTagTextLength={10}
                    value={this.state.treeIndustry}
                    //searchValue={this.state.treeSearchValue}
                    autoClearSearchValue
                    treeData={industry_tree_list}
                    treeNodeFilterProp="title"
                    treeCheckable
                    //showSearch
                    allowClear
                    showCheckedStrategy={SHOW_PARENT}
                    onSearch={this.onSearch}
                    onChange={this.onTreeChange}
                    onSelect={this.onSelect}
                    maxTagCount={2}
                    maxTagPlaceholder={valueList => {
                      console.log('Max Tag Rest Value:', valueList);
                      return `${valueList.length} rest...`;
                    }}
                 />
              </div>
              
              <div className="col-md-6 mb-md-6 mb-4"> 
                <Autocomplete
                  multiple
                  autoHighlight
                  id="majorSpeciality"
                  open={this.state.majorSpecialityText !=null ? (this.state.majorSpecialityText.length >= SPECIALITY_LENGTH ? true : false) : false}
                  options={this.props.specialityList ? this.props.specialityList : []}
                  //getOptionLabel={option => option.label}
                  value={majorSpeciality}
                  freeSolo
                  renderInput={params => (
                    <TextField
                      {...params}
                      //variant="outlined"
                      label="Required Specialities"
                      placeholder=""
                      fullWidth
                      error={!majorSpeciality.length>0}
                      helperText={!majorSpeciality.length>0 && "Requried."}
                    />
                  )}
                  onInputChange={(e, value) => this.autocompleteTextChange(e, value, 'majorSpecialityText')}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'majorSpeciality')}
                />  
              </div>
              
              <div className="col-md-6 mb-md-6 mb-4"> 
                <Autocomplete
                  multiple
                  autoHighlight
                  id="minorSpeciality"
                  open={this.state.minorSpecialityText !=null ? (this.state.minorSpecialityText.length >= SPECIALITY_LENGTH ? true : false) : false}
                  options={this.props.specialityList ? this.props.specialityList : []}
                  //getOptionLabel={option => option.label}
                  value={this.state.minorSpeciality}
                  freeSolo
                  renderInput={params => (
                    <TextField
                      {...params}
                      //variant="outlined"
                      label="Optional Specialities"
                      placeholder=""
                      fullWidth
                    />
                  )}
                  onInputChange={(e, value) => this.autocompleteTextChange(e, value, 'minorSpecialityText')}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'minorSpeciality')}
                />  
              </div>
            
              <div className="col-md-6 mb-md-6 mb-4">
                <Autocomplete
                  multiple
                  autoHighlight
                  id="majorLanguage"
                  options={languageList}
                  getOptionLabel={option => option.label}
                  value={majorLanguage}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      //variant="outlined"
                      label="Required Languages" 
                      placeholder="" 
                      fullWidth 
                      error={!majorLanguage.length>0}
                      helperText={!majorLanguage.length>0 && "Requried."}
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'majorLanguage')}
                />  
              </div>
              
              <div className="col-md-6 mb-md-6 mb-4">
                <Autocomplete
                  multiple
                  autoHighlight
                  id="minorLanguage"
                  options={languageList}
                  getOptionLabel={option => option.label}
                  value={this.state.minorLanguage}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      //variant="outlined"
                      label="Optional Languages" 
                      placeholder=""
                      fullWidth 
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'minorLanguage')}
                />  
              </div>
            </div>
          </Widget>
          
          <Widget styleName="jr-card-profile">
            <div className="mb-12">
              <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Career Expert Insight</h3>
            </div>
            
            <div className="row">
              <div className="col-md-12 mb-md-4">
                <TextField
                  className="jobTextArea"
                  name="careerExpertInsight"
                  fullWidth
                  multiline={true}
                  variant="outlined"
                  value={careerExpertInsight}
                  onChange={this.textboxChange}
                  error={!careerExpertInsight}
                  helperText={!careerExpertInsight && "Requried."}
                />
              </div>
            </div>
          </Widget>
          
          <div className="row">
            <Button variant="contained" className="mt-1 mr-3 ml-auto" color="primary" onClick={this.formSubmit} disabled={this.state.isFormLoading}> {this.state.isFormLoading && <i className='fa fa-spinner fa-spin' />}{ this.state.isUpdate ? "Update" : "Post" }</Button>
          </div>
          
        </div>
        
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { listLoading, companyList, specialityList, countryList, languageList, industry_tree_list } = state.list //jobCategoryList
  return { 
    listLoading,
    companyList,
    specialityList, 
    countryList,
    languageList,
    industry_tree_list,
    //jobCategoryList,
  }
};

export default withRouter(connect(mapStateToProps, null)(PostJob));
