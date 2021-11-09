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
import SearchBox from 'components/SearchBox';
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

class AdminJobListFilter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {  
       country_list : [],
       industry_list : [],
       salary: { min: 0, max: 500000 },
       experience: { min: 0, max: 50 },
       openBtnList : new Map(),
       open: false,
       myCandidate: false,
       activeCandidate: false,
       locationSelected: [],
    };
    
  }
  
  componentDidMount() {
    const countryData = this.props.countryList;
    const industryData = this.props.industryList;
    //console.log(countryData);
    if((countryData != null))
        this.setState({country_list : Object.assign([], countryData)});
    if((industryData != null))
        this.setState({industry_list : Object.assign([], industryData)});
  }

  handleChange = name => (event, checked) => {
    this.setState({[name]: checked});
  };

 
  toggle = (targetListName) => {
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

  /*clearText = () => {
   this.props.selectSearchText("");
 }*/
  clearText = (name) => {
   this.props.selectSearchText("", name);
  }
  
  render() {
    const transitions = ["height", "opacity", "background"];
    return (
      <div className="row">
        <div className="col-sm-12"  style={{'overflow-y':'auto'}}>
          <div style={{'margin-bottom':'5px'}}>
            <SearchBox placeholder="Job Info..."
                       onChange={this.props.updateSearchText}
                       selectSearchText={this.props.selectSearchText}
                       clearText={this.clearText.bind(this)}
                       value={this.props.searchText}

                 />
          </div>
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
          
          <p className="MuiFormHelperText-root text-black filterHeader">Locations</p>
          <AutocompleteWithFilterStyle
            multiple
            limitTags={2}
            id="location"
            options={this.state.country_list}
            disableCloseOnSelect
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
   
          {/*
          <Button variant="contained" color="primary" className="jr-btn" style={{'width':'100%', 'margin-bottom':'5px'}} onClick={() => this.toggle('location')}>Locations</Button>
          <Fragment>
            <Main>
              <Expand
                open={this.state.openBtnList.get('location') == true ? true : false}
                duration={500}
                transitions={transitions}
              >
                <ExpandBoxes>
                  <BoxExpand>
                      <div className="col-md-12 mb-md-12"> 
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
                          />  
                          
                          
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="checkboxes-tags-demo"
                            options={top100Films}
                            disableCloseOnSelect
                            getOptionLabel={option => option.title}
                            renderOption={(option, { selected }) => (
                              <React.Fragment>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 2 }}
                                  checked={selected}
                                />
                                {option.title}
                              </React.Fragment>
                            )}
                            style={{ width: 500 }}
                            renderInput={params => <TextField {...params} variant="standard" />}
                          />
                          
                         
                      </div>
                  </BoxExpand>
                </ExpandBoxes>
              </Expand>
            </Main>
          </Fragment> */}
          
          
		 			<p className="MuiFormHelperText-root text-black filterHeader">Salary</p>
		 			<div className="specialism_widget" style={{width:'90%','padding-top':'20px'}}>
		 				<InputRange
		 				  step={10000}
              maxValue={500000}
              minValue={0}
              value={this.props.salary}
              onChange={salary => { this.props.onFieldChanged("salary", salary)}} />
		 			</div>
			 			
			 		<p className="MuiFormHelperText-root text-black filterHeader">Experience</p>
		 			<div className="specialism_widget" style={{width:'90%','padding-top':'20px'}}>
		 				<InputRange
		 				  step={1}
              maxValue={50}
              minValue={0}
              value={this.props.experience}
              onChange={experience => { this.props.onFieldChanged("experience", experience)}} />
		 			</div>

        <br/>
        <Button variant="contained" color="primary" className="jr-btn" style={{'width':'45%', 'height': '35px'}} onClick={() => { this.props.clearFilter() }}>
                        <font size=""><i className="la la-undo mr-2"/></font>
                            Clear
        </Button>

        <Button variant="contained" color="primary" className="jr-btn" style={{'width':'45%', 'height': '35px'}} onClick={() => { this.props.search() }}>
                        <font size=""><i className="la la-search mr-2"/></font>
                            Search
        </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
   const {countryList, industryList} = state.list;
  return {
    countryList,
    industryList
  };
}

export default withRouter(connect(mapStateToProps)(AdminJobListFilter));