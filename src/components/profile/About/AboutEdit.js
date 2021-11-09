import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputSalary from 'components/InputNumber/InputSalary';
import * as notification from 'actions/Notification';
import { requestInitUser } from 'actions/Auth';  

class AboutEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      openToRelocation: false,
      city: null,
      industry: null,
      subIndustry: null,
      salary: null,
      bonus: null,
      experience: null,
      noticePeriod: null,
      openToOpportunity: true,
    };
  }
  
  componentDidMount() {
    if (this.props.candidateData)
      this.setState({ 
        location: this.props.locData ?
          this.props.countryList.find(obj => { return obj.value===this.props.locData._id })
        : 
          this.props.candidateData.location ? 
            { value: this.props.candidateData.location._id, label: this.props.candidateData.location.name } 
          : 
            this.props.countryList.find(obj => { return obj.label==="Hong Kong" }),
        city: this.props.candidateData.address && this.props.candidateData.address.city, //{ value: this.props.candidateData.address.city, label: this.props.candidateData.address.city },
        openToRelocation:  this.props.candidateData.openToRelocation==null ? false : this.props.candidateData.openToRelocation,
        industry: this.props.indData ? 
          this.props.industryList.find(obj => { return obj.value===this.props.indData._id })
        :
          this.props.candidateData.industry && { value: this.props.candidateData.industry._id, label: this.props.candidateData.industry.name },
        subIndustry: this.props.candidateData.subIndustry && { value: this.props.candidateData.subIndustry._id, label: this.props.candidateData.subIndustry.name },
        salary: this.props.candidateData.salary==null ? null : this.props.candidateData.salary,
        bonus: this.props.candidateData.bonus==null ? null : this.props.candidateData.bonus,
        experience: this.props.expData ? this.props.expData : this.props.candidateData.experience,
        noticePeriod: this.props.candidateData.noticePeriod,
        openToOpportunity: this.props.candidateData.openToOpportunity==null ? true :this.props.candidateData.openToOpportunity,
      });
  }
  
  handleNumberInputChange = (e) => {
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
      if (name=='location') {
        this.setState({ city: null });
      }
      if (name=='industry')
        this.setState({ subIndustry: null });
    });
  }
  
  editSave = () => {
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
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
    const { location, city, openToRelocation, industry, subIndustry, salary, bonus, experience, noticePeriod, openToOpportunity } = this.state;
    const { countryList, industryList } = this.props;
    
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
          {/* location && countryList.find(obj => { return obj.value === location.value })['city_list'].length>0 &&
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <Autocomplete
              value={city}
              options={location==null ? [] : countryList.find(obj => { return obj.value === location.value })['city_list']} 
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="City" 
                  fullWidth 
                  error={!city}
                  helperText={!city && "Required"}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'city')}
            />
          </div>
          */}
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
              options={industry==null ? [] : industryList.find(obj => { return obj.value === industry.value })['subIndustry_list']} 
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
              label="Year of Experience"
              type="number"
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
              {/*<FormControl fullWidth>
                <InputLabel htmlFor="noticePeriod">Notice Period (in Month)</InputLabel>
                <Input
                  //id="noticePeriod"
                  name="noticePeriod"
                  type="number"
                  value={noticePeriod}
                  onChange={(e) => this.handleNumberInputChange(e)}
                />
              </FormControl>*/}
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
              label="Open to Opportunities"
            />
          </div>
        </div>
        <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
        <Button className="mt-2 mr-2" onClick={this.props.cancel}>Cancel</Button>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  const { countryList, industryList } = state.list;
  return { countryList, industryList };
};

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutEdit))
