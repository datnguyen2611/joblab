import React, {useState, useEffect, useCallback, useRef} from "react";
import {useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import axios from "axios";
import * as notification from 'actions/Notification';

import AlertTable from './AlertTable';
import DataTable from './DataTable';

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'

export default function CandidateJobAlert(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ jobAlertName: "", keyword: "", errorJobAlertName: false, errorKeyword: false, 
                                       errorIndustries: false, industriesSelected: [], isFormLoading: false, alertType: "1" });
  const [jobAlertList, setJobAlertList] = useState([]);
  const { updateHeaderStyle } = props;

  //redux
  const listLoading = useSelector(state => state.list.listLoading);
  const industryList = useSelector(state => state.list && state.list.industryList ? state.list.industryList : []);
  
  
  useEffect(() => {
    updateHeaderStyle(VERTICAL_NAVIGATION, true);
    initJobAlertData();
  }, [updateHeaderStyle, listLoading]);
  
  var textboxBlur = (field) => {
    setState(prevState => ({ ...prevState, [field]: true }));
  }
  
  var textboxChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  
  var autocompleteChange = (e, value, name) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  var initJobAlertData = () => {
    if(!listLoading && isLoading) 
    {
      getJobAlertData();
      setIsLoading(false);
    }
  }
  
  var getJobAlertData = () => {
    axios.get('/api/candidates/get/jobalert')
      .then(res => {
        if (res.data.isSuccess) {
          setJobAlertList(res.data.jobAlert);
        }
      })
      .catch(function (err) {
        console.log(err);
        //e.preventDefault();
      });
  }
  
  var clearForm = () => {
    setState({ jobAlertName: "", keyword: "", errorJobAlertName: false, errorKeyword: false, 
               errorIndustries: false, industriesSelected: [], isFormLoading: false, alertType: "1" });
  }
  
  var formSubmit = (e) => {
    setState(prevState => ({ ...prevState, isFormLoading: true }));
    //e.preventDefault();
    var data = {
      alertName : state.jobAlertName,
      keywords : state.keyword,
      industry : state.industriesSelected.map(obj => obj.value),
      alertType : state.alertType
    };
    axios.post('/api/candidates/set/jobalert', data)
      .then(resp => {
        if(resp.data.isSuccess)
        {
          getJobAlertData();
          notification.success("You have created job alert successfully.");
        }
        else {
          var msg = "The action cannot be performed at the moment. Please try again later.";
          if(resp.data.msg) {
            msg = resp.data.msg;
          }
          notification.error(msg);
        }
        setState(prevState => ({ ...prevState, isFormLoading: false }));
      })
  }
  
  return (
    <div className="app-wrapper reactour-scroll">

      { isLoading ?
        <div className="loader-view"
             style={{height: props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress/>
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
        </div> : 
        <div className="row" style={{'justify-content': 'center'}}>
          <Helmet>
              <title>Job Alert | JobsLab</title>
          </Helmet>
         
          
          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12 mb-md-6 mb-4">
            <div className="row">
                <div className="col-12 mb-md-6 mb-4">
                    <TextField
                      name="jobAlertName"
                      label="Job Alert Name"
                      fullWidth
                      value={state.jobAlertName}
                      onChange={textboxChange}
                      onBlur={() => textboxBlur("errorJobAlertName")}
                      error={state.errorJobAlertName && state.jobAlertName==""}
                      helperText={!state.jobAlertName && "Required"}
                    />
                </div>
                <div className="col-md-6 mb-md-6 mb-4">
                <Autocomplete
                  multiple
                  autoHighlight
                  id="industryList"
                  options={industryList}
                  getOptionLabel={option => option.label}
                  value={state.industriesSelected}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      //variant="outlined"
                      label="Industries" 
                      placeholder="" 
                      fullWidth 
                      error={state.industriesSelected.length == 0 && state.errorIndustries}
                      //error={!state.industriesSelected.length>0}
                      helperText={!state.industriesSelected.length>0 && "Requried"}
                    />
                  )}
                  onBlur={() => textboxBlur("errorIndustries")}
                  onChange={(e, value) => autocompleteChange(e, value, 'industriesSelected')}
                />  
              </div>
              <div className="col-md-6 mb-md-6 mb-4">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Alert Type</FormLabel>
                  <RadioGroup row aria-label="alertType" value={state.alertType} onChange={textboxChange} name="alertType">
                    <FormControlLabel value="1" control={<Radio color="primary" />} label="Daily" />
                    <FormControlLabel value="2" control={<Radio color="primary" />} label="Weekly" />
                    <FormControlLabel value="3" control={<Radio color="primary" />} label="Monthly" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-12">
                    <TextField
                      name="keyword"
                      label="Alert Keyword"
                      fullWidth
                      value={state.keyword}
                      onChange={textboxChange}
                      onBlur={() => textboxBlur("errorKeyword")}
                      error={state.errorKeyword && state.keyword==""}
                      helperText={!state.keyword && "Required"}
                    />
              </div>
              <div className="col-12">
                <Button variant="contained" className="mt-1 mr-3 ml-auto" color="primary" onClick={clearForm} disabled={state.isFormLoading}>Clear</Button>
                <Button variant="contained" className="mt-1 mr-3 ml-auto" color="primary" onClick={formSubmit} disabled={state.isFormLoading}> {state.isFormLoading && <i className='fa fa-spinner fa-spin' />}Save</Button>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12 mb-md-6 mb-4">
            <DataTable jobAlertList={jobAlertList} />
          </div>
        </div>
      }
      </div>
  );
};