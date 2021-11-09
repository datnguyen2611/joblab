import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import { getSuggestions } from './functions.js';
import './autoSuggestStyleHome.css';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <span>
    {suggestion.name}
  </span>
);


class SearchBox extends Component {
  constructor(props) {
      super(props);
      this.state ={
        suggestions: []
      }
      
      this.suggestTheme = {
        container:                'containerHome',
        containerOpen:            'containerOpenHome',
        input:                    'inputHome',
        inputOpen:                'inputOpenHome',
        inputFocused:             'inputFocusedHome',
        suggestionsContainer:     'suggestionsContainerHome',
        suggestionsContainerOpen: 'suggestionsContainerOpenHome',
        suggestionsList:          'suggestionsListHome',
        suggestion:               'suggestionHome',
        suggestionFirst:          'suggestionFirstHome',
        suggestionHighlighted:    'suggestionHighlightedHome',
        sectionContainer:         'sectionContainerHome',
        sectionContainerFirst:    'sectionContainerFirstHome',
        sectionTitle:             'sectionTitleHome'
      }
    }
    
  componentDidMount() {
    this.setState({
          clearBtnStyle: (this.props.clearBtnStyle ? this.props.clearBtnStyle : "clear-icon")
    });
    
  }
  
  onSuggestionsFetchRequested = ({ value }) => {
        var enableSuggestion = this.props.enableSuggestion == false ? false : true;
        var searchList = (this.props.searchList && enableSuggestion)?this.props.searchList:[];
        this.setState({
          suggestions: getSuggestions(value, searchList)
        });
    };
    
  onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };
    
  onSuggestionSelected = (event, {suggestionValue}) => {
    	var targetElement = event.target;
  	  var targetName = "";
  	  var isTargetFound = false;
  	  var name =  (this.props.name)?this.props.name:"searchText";
  	  //find autosuggest container
    	while(!isTargetFound)
      {
        if(targetElement.tagName == "DIV")
        {
          if(targetElement.classList.contains("containerHome"))
          {
            isTargetFound = true;
          }
        }
        if(!isTargetFound)
          targetElement = targetElement.parentNode;
      }
      
      var childElements =  targetElement.children;
  		for(var i = 0; i < childElements.length; i++){
  			if (childElements[i].tagName == "INPUT") {
  			   targetName = childElements[i].name;
  			   break;
  			}
  		}
  		if(this.props.selectSearchText)
  		    this.props.selectSearchText(suggestionValue, name);
  		    
  		event.preventDefault();
  		event.stopPropagation();
  		/*
      this.setState({
        [targetName]: suggestionValue
      });
      */
    }
    
  render(){
      const {clearBtnStyle} = this.state;
      
      var name =  (this.props.name)?this.props.name:"searchText";
      const inputPropsAutoSuggestSearch = {
        value: (this.props.value)?this.props.value:"",
        id: (this.props.id)?this.props.id:"searchText",
        name: name,
        onChange: this.props.onChange,
        onKeyPress: this.props.searchByKey,
        placeholder:this.props.placeholder ? this.props.placeholder : "Search jobs..." ,
        
        endAdornment: (
          <IconButton onClick={() => this.props.onChange("")}>
            <ClearIcon />
          </IconButton>
        )
        
      };
      
    
      return (
      <div className={`search-bar right-side-icon bg-transparent ${this.props.styleName}`}>
      <div className="form-group">
          <Autosuggest className="form-control border-0"
                  suggestions={this.state.suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  onSuggestionSelected={this.onSuggestionSelected}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputPropsAutoSuggestSearch}
                  theme={this.suggestTheme}
                />
          {
            this.props.value ? 
              <IconButton className={clearBtnStyle} onClick={() => this.props.clearText(name)}>
                <ClearIcon style={{"font-size":"15px"}} />
              </IconButton>
              : ""
          }
          
          <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { searchList } = state.list;
  return { searchList }
};

export default connect(mapStateToProps)(SearchBox);
