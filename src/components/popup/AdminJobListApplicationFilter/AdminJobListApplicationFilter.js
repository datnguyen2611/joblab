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

class AdminJobListApplicationFilter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {  
       industry_list : [],
       appState_List : [],
       similarity: { min: 0, max: 100 },
       experience: { min: 0, max: 50 },
       openBtnList : new Map(),
       open: false,
    };
  }
  
  componentDidMount() {
    //const industryData = this.props.industryList;
    const appStateData = this.props.appStateList;
    
    /*if((industryData != null))
        this.setState({industry_list : Object.assign([], industryData)});*/
    if((appStateData != null))
        this.setState({appState_List : Object.assign([], appStateData)});

  }

  clearText = (name) => {
   this.props.selectSearchText("", name);
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
    return (
      <div className="row">
        <div className="col-sm-12"  style={{'overflow-y':'auto'}}>
          <div style={{'margin-bottom':'5px'}}>
            <SearchBox placeholder="Candidate Info..."
                       onChange={this.props.updateSearchText}
                       selectSearchText={this.props.selectSearchText}
                       clearText={this.clearText.bind(this)}
                       value={this.props.searchText}
                       enableSuggestion={false}

                 />
          </div>
          
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
          
		 			<p className="MuiFormHelperText-root text-black filterHeader">Similarity</p>
		 			<div className="specialism_widget" style={{width:'90%','padding-top':'20px'}}>
		 				<InputRange
		 				  step={1}
              maxValue={100}
              minValue={0}
              value={this.props.similarity}
              onChange={similarity => { this.props.onFieldChanged("similarity", similarity)}} />
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
			 			
			 		<p className="MuiFormHelperText-root text-black filterHeader">Only recommended candidate</p>	
            <Switch
            classes={{
              checked: 'text-primary',
              track: 'bg-primary',
            }}
            checked={this.props.recommendedCandidate}
            onChange={ () => this.props.handlePropChange('recommendedCandidate')}
            aria-label="Recommended Candidate"
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
   //const {countryList, jobCategoryList, industryList} = state.list;
   const {jobCategoryList} = state.list;
  return {
    //countryList,
    jobCategoryList, 
    //industryList
  };
}

export default withRouter(connect(mapStateToProps)(AdminJobListApplicationFilter));