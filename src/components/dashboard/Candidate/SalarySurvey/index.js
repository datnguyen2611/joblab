import React, {Component} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import SalarySurveyChart from './SalarySurveyChart';

import industryData from './salary.json';

class SalarySurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industry1: null,
      subIndustry1: null,
      industry2: null,
      subIndustry2: null,
      
      industryList: industryData,
      
      dataset1: [],
      dataset2: [],
    };
  }
  
  autocompleteChange = (e, value, name) => {
    this.setState({ [name]: value });
    if (name=='industry1')
      this.setState({ subIndustry1: null });
    else if (name=='industry2')
      this.setState({ subIndustry2: null });
    else if (name=='subIndustry1')
      if (value==null)
        this.setState({ subIndustry1: null });
      else
        this.setState({ dataset1: value.salary });
    else if (name=='subIndustry2')
      if (value==null)
        this.setState({ subIndustry2: null });
      else
        this.setState({ dataset2: value.salary });
  }
  
  render() {
    const {industry1, subIndustry1, industry2, subIndustry2, industryList, dataset1, dataset2} = this.state;
    
    return (
      <div className="jr-card">
        <div className="jr-card-header mb-3 d-flex">
          <div>
            <h3 className="mb-0 mr-auto">Salary Comparison</h3>
            <p className="sub-heading">Compare your salary to other positions to see how you stack up.</p>
            {/*<p className="text-grey mb-1">Information Technology</p>*/}
          </div>
          <div className="ml-auto jr-dealclose-header-right">
            <p className="mb-2">
              <span style={{backgroundColor: "#FF9800"}}
                  className="size-8 rounded-circle d-inline-block mr-1"/>
              {subIndustry1 ? subIndustry1.label : 'Web Developer'}
            </p>
            {subIndustry2 ? 
            <p className="ml-2 mb-2">
              <span style={{backgroundColor: '#3BB4A3'}}
                  className="size-8 rounded-circle d-inline-block mr-1"/>
               {subIndustry2.label}
            </p>
            : null}
          </div>
        </div>
        <SalarySurveyChart datakey1={subIndustry1 && subIndustry1.label} dataset1={dataset1} datakey2={subIndustry2 && subIndustry2.label} dataset2={dataset2} />
        <div className="row">
          <div className="col-lg-2 col-md-12 col-sm-12">
            <Autocomplete
              value={industry1}
              options={industryList} 
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField {...params} label="Industry" fullWidth />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'industry1')}
            />
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12">
            <Autocomplete
              value={subIndustry1}
              options={industry1==null ? [] : industryList.find(obj => { return obj.value === industry1.value })['subIndustry_list']} 
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField {...params} label="Sub-Industry" fullWidth />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'subIndustry1')}
            />
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12">
            <h3 className="mt-3 text-center">vs </h3>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12 ml-auto">
            <Autocomplete
              value={industry2}
              options={industryList} 
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField {...params} label="Industry" fullWidth />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'industry2')}
            />
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12">
            <Autocomplete
              value={subIndustry2}
              options={industry2==null ? [] : industryList.find(obj => { return obj.value === industry2.value })['subIndustry_list']} 
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField {...params} label="Sub-Industry" fullWidth />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'subIndustry2')}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default SalarySurvey;