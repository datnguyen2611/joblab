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

class AdminApplicationFilter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {  
       //country_list : [],
       industry_list : [],
       appState_List : [],
       similarity: { min: 0, max: 100 },
       openBtnList : new Map(),
       open: false,
    };
    
  }
  
  componentDidMount() {
    //const countryData = this.props.country_list;
    const industryData = this.props.industryList;
    const appStateData = this.props.appStateList;
    
    //if((countryData != null))
    //    this.setState({country_list : Object.assign([], countryData)});
    if((industryData != null))
        this.setState({industry_list : Object.assign([], industryData)});
    if((appStateData != null))
        this.setState({appState_List : Object.assign([], appStateData)});

  }

  /*clearText = () => {
   this.props.selectSearchText("");
  }*/
 
  clearText = (name) => {
   this.props.selectSearchText("", name);
  }
  
  handleChange = name => (event, checked) => {
    this.setState({[name]: checked});
  };
  
  toggle = (targetListName) => {
    //console.log(this.state.industry_list);
    //console.log(this.state.appState_List);
    var list = this.state.openBtnList;
    var isOpen = true;
    if(list.has(targetListName))
      isOpen = !(list.get(targetListName));
    else
      list.set(targetListName,isOpen);
  
    console.log(list);
    
    list.forEach(function(value, key, map) {
      console.log(key);
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
        <div className="col-sm-12"  style={{'overflow-y':'auto'}}>
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

          <div style={{'margin-bottom':'5px'}}>
            <SearchBox placeholder="Candidate Info or Job Info..."
                       onChange={this.props.updateSearchText}
                       selectSearchText={this.props.selectSearchText}
                       clearText={this.clearText.bind(this)}
                       value={this.props.searchText}

                 />
          </div>
          
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
          
          <p className="MuiFormHelperText-root text-black filterHeader">Application Status</p>
          <AutocompleteWithFilterStyle
            multiple
            limitTags={2}
            id="appState"
            options={this.state.appState_List}
            disableCloseOnSelect
            getOptionLabel={option => option.label}
            value={this.state.appState_List.filter(item => (this.props.appStateSelected ? this.props.appStateSelected : []).find(i => i.value === item.value))}
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
            onChange={(e, value) => this.props.autocompleteChange(e, value, 'appStateSelected')}
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
          
          <Button variant="contained" color="primary" className="jr-btn" style={{'width':'100%', 'margin-bottom':'5px'}} onClick={() => this.toggle('appStatus')}>Application Status</Button>
          <Fragment>
            <Main>
              <Expand
                open={this.state.openBtnList.get('appStatus') == true ? true : false}
                duration={500}
                transitions={transitions}
              >
                <ExpandBoxes>
                  <BoxExpand>
                      <div  className="mb-12 filter-group">
                        <FormGroup>
                          {this.state.appState_List.map(item => (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            color="primary"
                                            checked={(this.props.checkedItemsAppStat)?this.props.checkedItemsAppStat.get(item.value):false}
                                            onChange= { () => this.props.handleCheckBoxChange('checkedItemsAppStat',item.value)}
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
          
		 			<p className="MuiFormHelperText-root text-black filterHeader">Similarity</p>
		 			<div className="specialism_widget" style={{width:'90%','padding-top':'20px'}}>
		 				<InputRange
		 				  step={1}
              maxValue={100}
              minValue={0}
              value={this.props.similarity}
              onChange={similarity => { this.props.onFieldChanged("similarity", similarity)}} />
		 			</div>
			 			
			 		<p className="MuiFormHelperText-root text-black filterHeader">Recommended Job</p>	
            <Switch
            classes={{
              checked: 'text-primary',
              track: 'bg-primary',
            }}
            checked={this.props.recommenededJob}
            onChange={ () => this.props.handlePropChange('recommenededJob')}
            aria-label="Recommended Job"
          />
          
          <p className="MuiFormHelperText-root text-black filterHeader">Only Active Job</p>	
            <Switch
            classes={{
              checked: 'text-primary',
              track: 'bg-primary',
            }}
            checked={this.props.activeJob}
            onChange={ () => this.props.handlePropChange('activeJob')}
            aria-label="Only Active Job"
          />
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
   const {countryList, jobCategoryList, industryList} = state.list;
  return {
    countryList,
    jobCategoryList, 
    industryList
  };
}

export default withRouter(connect(mapStateToProps)(AdminApplicationFilter));