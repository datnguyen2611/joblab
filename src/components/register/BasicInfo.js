import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputSalary from 'components/InputNumber/InputSalary';
import * as notification from 'actions/Notification';
import {SPECIALITY_LENGTH} from 'constants/AutoSuggest';

class BasicInfo extends React.Component {
  state = {
    location: null,
    city: null,
    openToRelocation: false,
    industry: null,
    subIndustry: null,
    salary: null,
    bonus: null,
    experience: null,
    noticePeriod: null,
    openToOpportunity: true,
    speciality: [],
    language: [],
  };
  
  componentDidMount() {
    if (this.props.candidateData)
      this.getUserData();
  }
  
  componentDidUpdate(prevProps) { 
    if (this.props.candidateData !== prevProps.candidateData) 
      this.getUserData();
  }
  
  getUserData = () => {
    this.setState({ 
        location: this.props.candidateData.location ? { value: this.props.candidateData.location._id, label: this.props.candidateData.location.name } : this.props.countryList.find(obj => { return obj.label==="Hong Kong" }),
        city: this.props.candidateData.address && this.props.candidateData.address.city,
        openToRelocation: this.props.candidateData.openToRelocation,
        industry: this.props.candidateData.industry && { value: this.props.candidateData.industry._id, label: this.props.candidateData.industry.name },
        subIndustry: this.props.candidateData.subIndustry && { value: this.props.candidateData.subIndustry._id, label: this.props.candidateData.subIndustry.name },
        salary: this.props.candidateData.salary==null ? null : this.props.candidateData.salary,
        bonus: this.props.candidateData.bonus==null ? null : this.props.candidateData.bonus,
        experience: this.props.candidateData.experience,
        noticePeriod: this.props.candidateData.noticePeriod,
        openToOpportunity: this.props.candidateData.openToOpportunity,
        speciality: this.props.candidateData.speciality==null ? [] : this.props.candidateData.speciality,
        language: this.props.candidateData.language==null ? [] : this.props.candidateData.language.map(obj => { return { value: obj._id, label: obj.name } }),
      });
  }
  
  
  handleNumberInputChange = (e, name) => {
    var name = e.target.name;
    this.setState({ [name]: parseInt(e.target.value, 10) });
  };
  
  handleSwitchChange = (e, checked) => {
    this.setState({ [e.target.name]: checked });
  };
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  autocompleteChange = (e, value, name) => {
    //var name = e.target.id.split('-')[0];
    this.setState({ [name]: value }, () => {
      if (name=='industry')
        this.setState({ subIndustry: null, isSubIndustryInput: false });
    });
  }
  
  autocompleteTextChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  formSubmit = () => {
    const data = {
      candId: this.props.candidateData ? this.props.candidateData._id : null,
      location: this.state.location && this.state.location.value,
      city: this.state.city && this.state.city,
      openToRelocation: this.state.openToRelocation,
      industry: this.state.industry && this.state.industry.value,
      subIndustry: this.state.subIndustry && this.state.subIndustry.value,
      salary: this.state.salary,
      bonus: this.state.bonus,
      experience: this.state.experience,
      noticePeriod: this.state.noticePeriod,
      openToOpportunity: this.state.openToOpportunity,
    };
    axios.post('/api/candidates/set/profile/about/update', data)
    .then(res => {
      if (res.data.isSuccess) {
        const spec_data = {
          candId: this.props.candidateData ? this.props.candidateData._id : null,
          speciality: this.state.speciality,
          language: this.state.language.map(obj => obj.value),
        };
        axios.post('/api/candidates/set/profile/skill/update', spec_data)
        .then(res => {
          if (res.data.isSuccess) {
            this.props.getUserData();
            this.props.handleNext();
          } else {
            notification.error(res.data.msg);
          }
        });
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
    const { location, city, openToRelocation, industry, subIndustry, salary, bonus, experience, noticePeriod, openToOpportunity, speciality, language } = this.state;
    const { countryList, industryList, specialityList, languageList } = this.props;
    const { activeStep, handleBack, handleNext } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Location</h3>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="row">
              <div className="col-12">
                <Autocomplete
                  value={location}
                  options={countryList}
                  getOptionLabel={option => option.label}
                  autoHighlight={true}
                  blurOnSelect={true}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      label="Country" 
                      fullWidth 
                      error={!location}
                      helperText={!location && "Required"}
                    />
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'location')}
                />
              </div>
              <div className="col-12">
                <FormControlLabel
                  control={
                    <Switch name="openToRelocation"
                      color="primary"
                      classes={{
                        checked: 'text-primary',
                        //bar: 'bg-primary',
                      }}
                      checked={openToRelocation}
                      onChange={(e, checked) => this.handleSwitchChange(e, checked)}
                    />
                  }
                  label="Open to Relocation"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              //id="jobTitle"
              name="city"
              label="City"
              value={city}
              onChange={this.textboxChange}
              fullWidth
            />
          </div>
          
          <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Industry</h3>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <Autocomplete
              value={industry}
              options={industryList}
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="Industry" 
                  fullWidth
                  error={!industry}
                  helperText={!industry && "Required"}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'industry')}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <Autocomplete
              value={subIndustry}
              options={this.state.industry==null ? [] : industryList.find(obj => { return obj.value === this.state.industry.value })['subIndustry_list']} 
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="Job Function" 
                  fullWidth 
                  error={!subIndustry}
                  helperText={!subIndustry && "Required"}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'subIndustry')}
            />
          </div>
                    
          <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Skills</h3>
          </div>
          
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                  helperText={!(speciality.length>0) ? "Required" : (!(speciality.length<21) ? "No. of speciality exceeds maximum number of 20." : "")}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'speciality')}
              onInputChange={(e, value) => this.autocompleteTextChange(e, value, 'specialityText')}
          />
          </div>
          
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                  helperText={!(language.length>0) ? "Required" : (!(language.length<6) ? "No. of language exceeds maximum number of 5." : "")}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'language')}
            />
          </div>
          
          <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Statistics</h3>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <InputSalary
              name="salary"
              label="Monthly Salary (HKD)"
              value={salary}
              onChange={this.handleNumberInputChange}
              //error={!salary}
              helperText={!salary && "Please input for better Job Match"}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <InputSalary
              name="bonus"
              label="Most Recent Bonus (HKD)"
              value={bonus}
              onChange={this.handleNumberInputChange}
              //error={!bonus}
              helperText={!bonus && "Please input for better Job Match"}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              //id="experience"
              name="experience"
              type="number"
              label="Year of Experience"
              inputProps={{ min: "0", max: "100", step: "1" }}
              value={experience}
              onChange={this.handleNumberInputChange}
              error={!experience}
              helperText={!experience && "Required"}
              fullWidth
            />
          </div>
          <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Job Seeking</h3>
          </div>
          { openToOpportunity &&
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
              <TextField
                name="noticePeriod"
                label="Notice Period (in Month)"
                type="number"
                inputProps={{ min: "0", step: "1" }}
                value={noticePeriod}
                onChange={this.handleNumberInputChange}
                error={!noticePeriod}
                helperText={!noticePeriod && "Required"}
                fullWidth
              />
            </div>
          }
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <FormControlLabel
              control={
                <Switch name="openToOpportunity"
                  color="primary"
                  classes={{
                    checked: 'text-primary',
                    //bar: 'bg-primary',
                  }}
                  checked={openToOpportunity}
                  onChange={(e, checked) => this.handleSwitchChange(e, checked)}
                />
              }
              label="I'm Open to Opportunity"
            />
          </div>
        </div>
        <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
        <div className="d-flex">
          <Button
            disabled={activeStep === 0 || activeStep === 1}
            onClick={handleBack}
            className="ml-auto mr-2"
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={this.formSubmit}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { countryList, industryList, specialityList, languageList } = state.list;
  return { countryList, industryList, specialityList, languageList };
};

export default connect(mapStateToProps, null)(BasicInfo);