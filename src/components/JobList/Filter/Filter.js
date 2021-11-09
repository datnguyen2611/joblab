import React, {Component, Fragment} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import InputRange from 'react-input-range';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Expand from "react-expand-animated";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import { withStyles } from "@material-ui/core/styles";

import {
  Main,
  BoxExpand,
  ExpandBoxes
} from "./App.styles.js";

const AutocompleteWithFilterStyle = withStyles({
  tag: {
    height: 24,
    position: "relative",
    backgroundColor: "#3f51b5",
    //zIndex: 0,
    
    "& .MuiChip-label": {
      color: "#fff"
    },
    "& .MuiChip-deleteIcon": {
      width: 18,
      color: "#fff"
    },
    "&:hover .MuiChip-deleteIcon": {
      color: "#f0f0fb"
    },
    
  }
})(Autocomplete);

class Filter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {  
       country_list : [],
       industry_list : [],
       //jobType_list : [],
       salary: { min: 0, max: 500000 },
       experience: { min: 0, max: 40 },
       openBtnList : new Map(),
       open: false,
    };
    
  }
  
  componentDidMount() {
    const countryData = this.props.countryList;
    const industryData = this.props.industryList;
    //const jobTypeData = this.props.jobCategoryList;
    
    if((countryData != null))
        this.setState({country_list : Object.assign([], countryData)});
    if((industryData != null)){
      this.setState({
        industry_list : Object.assign([], industryData),
      });
      
    }
    //if((jobTypeData != null))
    //    this.setState({jobType_list : Object.assign([], jobTypeData)});

  }

  handleChange = name => (event, checked) => {
    this.setState({[name]: checked});
  };
  
  toggle = (targetListName) => {
    //console.log(this.state.industry_list);
    //console.log(this.state.jobType_list);
    //console.log(this.state.country_list)
    var list = this.state.openBtnList;
    var isOpen = true;
    if(list.has(targetListName))
      isOpen = !(list.get(targetListName));
    else
      list.set(targetListName,isOpen);
  
    //console.log(list);
    
    list.forEach(function(value, key, map) {
      //console.log(key);
      if(key==targetListName)
        list.set(key,isOpen);
      else
        list.set(key,false);
    });
    this.setState({
      openBtnList : list
    });
  }

  render() {
    const transitions = ["height", "opacity", "background"];
    return (
      <div className="row">
        <div className="col-sm-12"  /*style={{'overflow-y':'auto'}}*/>
          {/*
          <Button variant="contained" color="primary" className="jr-btn" style={{'width':'100%', 'margin-bottom':'5px'}} onClick={() => this.toggle('country')} >Countries</Button>
          <Fragment>
            <Main>
              <Expand
                open={this.state.openBtnList.get('country') == true ? true : false}
                duration={500}
                transitions={transitions}
              >
                <ExpandBoxes>
                  <BoxExpand>
                    <div className="mb-12 filter-group">
                      <FormGroup>
                         {this.state.country_list.map(item => (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          color="primary"
                                          checked={this.state.checkedA}
                                          onChange={this.handleChange('checkedA')}
                                          value={item.label}
                                        />
                                      }
                                      label={item.label}
                                    />
          
                                  ))}
                      </FormGroup>
                    </div>
                  </BoxExpand>
                </ExpandBoxes>
              </Expand>
            </Main>
          </Fragment>
          */}
          <p className="MuiFormHelperText-root text-black filterHeader">Industries</p>
          <AutocompleteWithFilterStyle
            multiple
            limitTags={2}
            id="industry"
            options={this.state.industry_list}
            disableCloseOnSelect
            getOptionLabel={option => option.label}
            value={this.state.industry_list.filter(item => (this.props.industrySelected ? this.props.industrySelected : []).find(i => i.value === item.value))}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                  style={{ marginRight: 2 }}
                  checked={selected}
                />
                {option.label}
              </React.Fragment>
            )}
            style={{ width: "95%" }}
            className="tagLimitStyle"
            renderInput={params => <TextField {...params} variant="standard" fullWidth />}
            onChange={(e, value) => this.props.autocompleteChange(e, value, 'industrySelected')}
          />
          {/*
          <Button variant="contained" color="primary" className="jr-btn" style={{'width':'100%', 'margin-bottom':'5px'}} onClick={() => this.toggle('industry')}>Industries</Button>
          <Fragment>
            <Main>
              <Expand
                open={this.state.openBtnList.get('industry') == true ? true : false}
                duration={500}
                transitions={transitions}
              >
                <ExpandBoxes>
                  <BoxExpand>
                    <FormHelperText className="text-grey">Industries</FormHelperText>
                      <div  className="mb-12 filter-group">
                        <FormGroup>
                          {this.state.industry_list.map(item => (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            color="primary"
                                            checked={(this.props.checkedItemsIndustry)?this.props.checkedItemsIndustry.get(item.value):false}
                                            onChange= { () => this.props.handleCheckBoxChange('checkedItemsIndustry',item.value)}
                                            value={item.label}
                                          />
                                        }
                                        label={item.label}
                                      />
            
                                    ))}
            
                        </FormGroup>
                      </div>
                  </BoxExpand>
                </ExpandBoxes>
              </Expand>
            </Main>
          </Fragment>*/}
          {/*
          <Button variant="contained" color="primary" className="jr-btn" style={{'width':'100%', 'margin-bottom':'5px'}} onClick={() => this.toggle('expReview')}>Locations</Button>
          <Fragment>
            <Main>
              <Expand
                open={this.state.openBtnList.get('expReview') == true ? true : false}
                duration={500}
                transitions={transitions}
              >
                <ExpandBoxes>
                  <BoxExpand>
                  <div  className="mb-12 filter-group">*/}
                  {/*
                  <Autocomplete
                            multiple
                            id="location"
                            options={this.state.country_list}
                            getOptionLabel={option => option.label}
                            value={this.props.locationSelected}
                            renderInput={params => (
                              <TextField
                                {...params}
                                variant="outlined"
                                placeholder=""
                                fullWidth
                              />
                            )}
                            onChange={(e, value) => this.props.autocompleteChange(e, value, 'locationSelected')}
                          />*/}
                    <p className="MuiFormHelperText-root text-black filterHeader">Locations</p>
                    <AutocompleteWithFilterStyle
                      multiple
                      limitTags={2}
                      id="location"
                      options={this.state.country_list}
                      disableCloseOnSelecte
                      getOptionLabel={option => option.label}
                      value={this.state.country_list.filter(item => (this.props.locationSelected ? this.props.locationSelected : []).find(i => i.value === item.value))}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={<CircleUnchecked />}
                            checkedIcon={<CircleCheckedFilled />}
                            style={{ marginRight: 2 }}
                            checked={selected}
                          />
                          {option.label}
                        </React.Fragment>
                      )}
                      style={{ width: "95%" }}
                      className="tagLimitStyle"
                      renderInput={params => <TextField {...params} variant="standard" fullWidth />}
                      onChange={(e, value) => this.props.autocompleteChange(e, value, 'locationSelected')}
                    />
                    {/*</div>
                    <FormHelperText className="text-grey">Experts Reviews</FormHelperText>
                      <div  className="mb-12 filter-group">
                        <FormGroup>
                          {this.state.jobType_list.map(item => (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            color="primary"
                                            checked={(this.props.checkedItemsJobType)?this.props.checkedItemsJobType.get(item.value):false}
                                            onChange= { () => this.props.handleCheckBoxChange('checkedItemsJobType',item.value)}
                                          />
                                        }
                                        label={item.label}
                                      />
            
                                    ))}
            
                        </FormGroup>
                      </div>
                   
                  </BoxExpand>
                </ExpandBoxes>
              </Expand>
            </Main>
          </Fragment> */}
          
          
			 			<p className="MuiFormHelperText-root text-black filterHeader">Offered Salary</p>
			 			<div className="specialism_widget" style={{width:'90%','padding-top':'20px','padding-left':'10px'}}>
			 				<InputRange
			 				  step={5000}
                maxValue={500000}
                minValue={0}
                value={this.props.salary}
                onChange={salary => { this.props.onFieldChanged("salary", salary)}} />
			 			</div>
			 			<p className="MuiFormHelperText-root text-black filterHeader">Experience</p>
			 			<div className="specialism_widget" style={{width:'90%','padding-top':'20px','padding-left':'10px'}}>
			 				<InputRange
			 				  step={1}
                maxValue={40}
                minValue={0}
                value={this.props.experience}
                onChange={experience => { this.props.onFieldChanged("experience", experience)}} />
			 			</div>
			 		<p className="MuiFormHelperText-root text-black filterHeader">Enable AI Engine</p>	
          <Switch
          classes={{
            checked: 'text-primary',
            track: 'bg-primary',
          }}
          checked={this.props.enabledAIEngine}
          onChange={ () => this.props.handlePropChange('enabledAIEngine')}
          aria-label="Enable AI Engine"
        />
        <br/>
        <Button variant="contained" color="primary" className="jr-btn" style={{'width':'45%', 'height': '35px'}} onClick={() => { this.props.clearFilter() }}>
                        <font size=""><i className="la la-undo mr-2"/></font>
                            Clear
        </Button>

        <Button variant="contained" color="primary" className="jr-btn" style={{'width':'45%', 'height': '35px'}} onClick={() => { this.props.searchJob() }}>
                        <font size=""><i className="la la-search mr-2"/></font>
                            Search
        </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
   const {countryList, jobCategoryList, industryList} = state.list;
  return {
    countryList,
    jobCategoryList, 
    industryList
  };
}

export default withRouter(connect(mapStateToProps)(Filter));