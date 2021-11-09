import React, {cloneElement, Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import SearchBox from 'components/SearchBox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import {Progress} from "reactstrap";
import Modal from 'react-modal';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
//import Badge from '@material-ui/core/Badge';
import {Badge} from 'reactstrap';

import Widget from "components/Widget";
import Filter from "components/JobList/Filter";

import { WEB_IMAGE_URL, INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';

import {isMobile} from 'util/functions';
import modalStyle from 'styles/modalStyle';
Modal.setAppElement(document.getElementById('root'));

var queryString = require('query-string');

class JobLeftList extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
    hasMore: true,
    isProcessing: false,
	  //pageSize: 20,
	  pageNum: 1,
	  jobList: [],
    dense: false,
    secondary: true,
    jobListSearchModalIsOpen : false,
    modalStyleState : modalStyle.jobListModalStyle,
    searchBox: false,
    searchText: '',
    
    location: null,
    location_list: [],
    industry: null,
    industry_list: [],

    salary: { min: 0, max: 500000 },
    experience: { min: 0, max: 40 },
	  lastJobId:null,
	  noRecordFound:false,
	  pageReady: false,
	  suggestions: [],
	  searchList:[],
	  suggestTheme:{},
    checkedItemsIndustry: new Map(),
	  checkedItemsJobType: new Map(),
	  category_list:[],
	  locationSelected: [],
	  industrySelected: [],
	  isCand: false,
	  enabledAIEngine:true,
	  filterCount: 0,
  }; 
     
     
   }
  componentDidMount() {
    this.initData();
  }
  
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if(!newProps.listLoading && oldProps.listLoading) {
      this.initData();
    }
  }
  
  initData() {
    if(!this.props.listLoading) 
    {
      console.log("init data:" + this.props.listLoading);
    //default search values
      var params = queryString.parse(this.props.location.search);
      var searchText = (params.q) ? params.q : "";
     // var location = this.state.location_list.find((obj) => { return ((obj.value == params.loc) ? obj : ((obj.label == "Hong Kong") ? obj : null))});
      var location = (params.loc) ? params.loc : "";
      //var location = (this.state.location_list.hasOwnProperty(params.loc)) ? params.loc : (this.state.location_list.hasOwnProperty('5cd445e5f6bab6e3dac72fa0') ? '5cd445e5f6bab6e3dac72fa0' : 'default');
      //var industry = this.state.industry_list.find((obj) => { return ((obj.value == params.ind) ? obj : null) });
      //var industry = (this.state.industry_list.hasOwnProperty(params.ind)) ? params.ind : 'default';
      var industry = (params.ind) ? params.ind : "";
      var jobType = (params.jt) ? params.jt : "";
      var enabledAIEngine = (params.enAI == "false") ? false : true;
      
      var tempMap = new Map();
      
      //job type
      jobType.split(",").forEach(function (item) {
        if(item != "")
          tempMap.set(item, true);
      });
      jobType = tempMap;
      
      // industry
      /*
      tempMap = new Map();
      industry.split(",").forEach(function (item) {
        if(item != "")
          tempMap.set(item, true);
      });
      industry = tempMap;
      */
      // industry
      var selectedIndustry = [];
      var industryList = this.props.industryList ? this.props.industryList : [];
      console.log(industryList);
      console.log(industry);
      industry.split(",").forEach(function (item) {
          var tempIndustry = industryList.find((industryObj) => { return ((industryObj.value == item) ? industryObj : null) });
          console.log(tempIndustry);
          if(tempIndustry)
            selectedIndustry.push(tempIndustry);
      });
      
      industry = selectedIndustry;
      
       // location
      var selectedLocation = [];
      var countryList = this.props.countryList ? this.props.countryList : [];

      location.split(",").forEach(function (item) {
          var tempLocation = countryList.find((locationObj) => { return ((locationObj.value == item) ? locationObj : null) });
          if(tempLocation)
            selectedLocation.push(tempLocation);
      });
      
      location = selectedLocation;
      
      //console.log("jobType"+jobType);
      var minSalary = (parseInt(params.minSal)) ? parseInt(params.minSal) : 0;
      var maxSalary = (parseInt(params.maxSal)) ? parseInt(params.maxSal) : 500000;
      maxSalary = (maxSalary > 500000) ? 500000 : maxSalary;
      minSalary = (minSalary >= maxSalary) ? (maxSalary - 10000) : minSalary;
      var minExperience = (parseInt(params.minExp)) ? parseInt(params.minExp) : 0;
      var maxExperience = (parseInt(params.maxExp)) ? parseInt(params.maxExp) : 40;
      maxExperience = (maxExperience > 40) ? 40 : maxExperience;
      minExperience = (minExperience >= maxExperience) ? (maxExperience - 10) : minExperience;
      this.setState({
        searchText : searchText,
        locationSelected: location,
        industrySelected: industry,
        salary:{ min: minSalary, max: maxSalary},
        experience:{ min: minExperience, max: maxExperience},
        //checkedItemsIndustry: industry,
        //checkedItemsJobType: jobType,
        enabledAIEngine: enabledAIEngine
      }, () => {
        this.getFilterNum();
        //cannot convert map as json, get from url
        if(!this.state.pageReady)
        {
           this.setState({
            hasMore: true
           }); 
        }
        this.setState({
          //checkedItemsIndustry: industry,
          checkedItemsJobType: jobType,
          pageReady: true
        }); 
      });
      
      //restore list position for mobile view
      let previousInfo = window.localStorage.getItem("previousInfo");
      let jsonInfo = JSON.parse(previousInfo);
      
      if(jsonInfo)
      {
        window.localStorage.removeItem("previousInfo");
        this.setState({ ...jsonInfo.state
        }, () => {
          document.getElementById('inif-container').scrollTop = jsonInfo.scrollY;
        });
      }
      
    }
  }
  
  getFilterNum() {
    var count = 0;
    if(!(this.state.salary.min == 0 && this.state.salary.max == 500000))
      count+=1;
    if(!(this.state.experience.min == 0 && this.state.experience.max == 40))
      count+=1;
    //if( Array.from(this.state.checkedItemsIndustry.values()).includes(true) )
    if(this.state.locationSelected.length > 0)
      count+=1;
    if(this.state.industrySelected.length > 0)
      count+=1;
    //if( Array.from(this.state.checkedItemsJobType.values()).includes(true) )
    //  count+=1;
    if(this.state.isCand != false)
      count+=1;
    if(this.state.enabledAIEngine != true)
      count+=1;
      
    this.setState({
      filterCount: count
    })
  }
  
  /*selectSearchText(text){
     this.setState({
      searchText: text,
    });
  }*/
  
  selectSearchText(text, name){
     this.setState({
      [name]: text,
    });
  }
  
  updateSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
  }
  
  handleSelectChange = (object, name) => {
      this.setState({ [name]: object });
  }
  
  openModal = (e) => {
    e.preventDefault();
    this.setState({jobListSearchModalIsOpen: true});
  }
 
  afterOpenModal = () => {
    //this.subtitle.style.color = '#f00';
  }
  
  closeModal = () => {
    this.setState({
      jobListSearchModalIsOpen: false
    });
  }
  
  getMoreJd = () => {
    if(this.state.pageReady && !this.state.isProcessing)
    {
     this.setState({
       isProcessing: true
     })
     console.log("getMorejob:" + this.state.pageReady + ", hasMOre" + this.state.hasMore);
     //console.log("this.state.pageReady:" + this.state.pageReady);
     var jobType = ""

      this.state.checkedItemsJobType.forEach(function(value, key) {
        if(value)
          jobType += key + ",";
      });
      if(jobType.length>0)
      jobType = jobType.substr(0, jobType.length-1); 
      /*
      var industry = ""

      this.state.checkedItemsIndustry.forEach(function(value, key) {
        if(value)
          industry += key + ",";
      });
      if(industry.length>0)
      industry = industry.substr(0, industry.length-1); 
      */
      var industry = "";
    
      this.state.industrySelected.forEach(function(object) {
        if(object.value)
          industry += object.value + ",";
      });
      
      if(industry.length>0)
        industry = industry.substr(0, industry.length-1); 
        
      var location = ""
    
      console.log(this.state.locationSelected);
      this.state.locationSelected.forEach(function(object) {
        if(object.value)
          location += object.value + ",";
      });
      
      if(location.length>0)
        location = location.substr(0, location.length-1); 
        
      axios.post('/api/jobs/get/job/list/more' , {
        lastJobId: this.state.lastJobId,
        pageNum: this.state.pageNum,
        //recordPerReq: this.state.pageSize,
        searchData: this.state.searchText,
        //searchCountryId: this.state.location ? this.state.location.value : "default",
        jobLocation: location,
        searchIndustry: industry ? industry : "default",
        minSalary: this.state.salary.min,
        maxSalary: this.state.salary.max,
        minExperience: this.state.experience.min,
        maxExperience: this.state.experience.max,
        jobType: jobType,
        enabledAIEngine: this.state.enabledAIEngine
      }) 
      .then(res => {
        if (res.data.isSuccess) {
          console.log("enter success get more job");
          this.setState({
              jobList:  this.state.jobList.concat(res.data.jobList),
              hasMore: (res.data.hasMore == true)? true : false,
              lastJobId: (res.data.jobList.length > 0) ? res.data.jobList[res.data.jobList.length-1]._id: this.state.lastJobId,
              pageNum: this.state.pageNum + 1
          });
          
          //init first job
          if(!this.props.activeJob && this.state.jobList.length > 0 && !isMobile())
              this.props.updateActiveJob(this.state.jobList[0]._id, this.state, 0);
          else if(!isMobile() && this.state.jobList.length == 0)
              this.props.updateActiveJob(null, null, 0);
              
          console.log("call get more");
          //console.log(res.data.jobList);
          //console.log(this.state.hasMore);
          //console.log(this.state.lastJobId);
          //console.log(this.state.pageNum);
          
          //if records are not returned
          if(!this.state.lastJobId)
          {
            this.setState({ noRecordFound:true });
          }
        }
        this.setState({
           isProcessing: false
         })
      })
      .catch(function (err) {
        console.log(err);
      });   
    }
    
 }
 
 updateCheckList = (list, key) => {
   var gotList = this.state[list];
   if(gotList)
   {
      if(gotList.has(key))
        gotList.set(key,!gotList.get(key));
      else
         gotList.set(key,true);
         
      this.setState({
         [list] : gotList
      })
   }
 }
 
 handlePropChange = (key) => {
   var prop = this.state[key];
    this.setState({
       [key] : !prop
    })
 }
 
 inputRangeChanged = (name, value) => {
    this.setState({
      [name]: value
    });
  }
 
 clearText = () => {
   this.setState({
     searchText : "",
   });
 }
 
 clearFilter = () => {
  
    this.setState({
      checkedItemsIndustry: new Map(),
      checkedItemsJobType: new Map(),
      salary      : { min: 0, max: 500000 },
      experience  : { min: 0, max: 40 },
      searchText : "",
      //location : this.state.location_list.find((obj) => { return (obj.label == "Hong Kong") }),
      industry : null,
      locationSelected : [],
      industrySelected : [],
      enabledAIEngine: true,
    });
  }
  
  searchJobByKey = (e) => {
    if(e.key === 'Enter'){
      this.searchJob();
    }
  }
  
  searchJob = () => {
    //this.props.history.push('/joblist/'+ this.state.searchText + '/' + this.state.location);
    var queryParm = "?";
    var seperator = "&";
    var jobType = "";
    //var industry = "";
    
    this.state.checkedItemsJobType.forEach(function(value, key) {
      if(value && key)
        jobType += key + ",";
    });
    if(jobType.length>0)
      jobType = jobType.substr(0, jobType.length-1); 
    /*  
    this.state.checkedItemsIndustry.forEach(function(value, key) {
      if(value && key)
        industry += key + ",";
    });
    if(industry.length>0)
      industry = industry.substr(0, industry.length-1); 
   */
   var industry = ""
    
    //console.log(this.state.locationSelected);
    this.state.industrySelected.forEach(function(object) {
      if(object.value)
        industry += object.value + ",";
    });
    
    if(industry.length>0)
      industry = industry.substr(0, industry.length-1); 
      
   var location = ""
    
    console.log(this.state.locationSelected);
    this.state.locationSelected.forEach(function(object) {
      if(object.value)
        location += object.value + ",";
    });
    
    if(location.length>0)
      location = location.substr(0, location.length-1); 
      
    queryParm += "q=" + this.state.searchText + seperator;
    queryParm += "loc=" + (location || '') + seperator;
    //queryParm += "loc=" +((this.state.location != null) ? this.state.location.value : "default") + seperator;
    //queryParm += "ind=" + this.state.industry + seperator;
    queryParm += "ind=" + industry + seperator;//+((this.state.industry != null) ? this.state.industry.value : "default") + seperator;
    queryParm += "jt=" + jobType + seperator;
    queryParm += "minSal=" + this.state.salary.min + seperator;
    queryParm += "maxSal=" + this.state.salary.max + seperator;
    queryParm += "minExp=" + this.state.experience.min + seperator;
    queryParm += "maxExp=" + this.state.experience.max + seperator;
    queryParm += "enAI=" + this.state.enabledAIEngine;
    console.log("queryParm" + queryParm);
    window.location = '/joblist' + queryParm;
  }
  
  autocompleteChange = (e, value, name) => {
    console.log(value);
    this.setState({ [name]: value });
  }
  
  render() {
    const loader = <div className="loader" key={0} style={{padding: "30px 0px"}}>Loading ...</div>;
    const isMobileView = isMobile();
    const {dense,filterCount} = this.state;

    var items = [];
    this.state.jobList.map((job, i) => {
      const score = Math.round(job.similarityInfo ? job.similarityInfo.score *100 : 0) ;
      items.push(
        <ListItem button divider selected={(job._id == this.props.activeJob) ? true : false} key={job._id} onClick={(e) => this.props.updateActiveJob(job._id, this.state, document.getElementById('inif-container').scrollTop)}>
          <ListItemText style={{"width":"70%"}} disableTypography={true}
            primary={<div className="font-weight-bold joblist" ><font>{job.jobTitle}</font></div>}
            secondary={ <div className="joblist-left-content-container">
                          <span className="font-weight-bold">{job.company==null && <i class="zmdi zmdi-lock"/>}{(job.company==null) ? " Company Locked" : job.company}</span>
                          <span>{(job.industry == null) ? "" : job.industry.name}</span>
                          <span><i class="la la-map-marker"></i>
                            {job.address && job.address.city && job.location ? 
                              job.address.city+", "+ job.location.name : 
                              (job.location ? job.location.name : "") }
                          </span>
                          <span>{score}  % Match <Progress className="shadow-lg my-1 match-progress-bar" color="blue" value={score}/></span>
                        </div>
                      }
          />
          
          <div className={`jr-profile-banner-avatar joblist-left ${job.isExclusive ? "exclusive-list" : ""}`} style={{'background':'white'}}>
            <img 
              className="jobContent-img-size-left" alt="..." 
              src={(job.company == null) ? 
              encodeURI(INDUSTRY_ICON_URL + (job.industry[0] ? job.industry[0]._id.name : "") + ".png") : 
              encodeURI(COMPANY_ICON_URL+job.company+".png")} 
            />
            {/*<img className="jobContent-img-size-left" alt="..." src={(job.company == null) ? process.env.PUBLIC_URL+"/industry/"+((job.industry[0]) ? job.industry[0]._id.name : "")+".png" : encodeURI("https://hkjobslab.s3-ap-southeast-1.amazonaws.com/company/"+job.company+".png")} />*/}
          </div>
        </ListItem>
      )
      //items.push(<Divider variant="inset" component="li" />);
    });
    return (
      <div>
        <div className="row" style={{'margin-right':'0px'}}>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12" style={{'background':'#00bcd4','height':'40px'}}>
            <div className="row jobList-top">
              <div className="col-xl-10 col-lg-9 col-md-10 col-10">
                <SearchBox styleName="joblist-searchBox" placeholder="Search here..."
                       onChange={this.updateSearchText.bind(this)}
                       searchByKey={this.searchJobByKey.bind(this)}
                       selectSearchText={this.selectSearchText.bind(this)}
                       value={this.state.searchText}
                       clearText={this.clearText.bind(this)}
                       clearBtnStyle={"clear-icon-jl"}

                 />
                       
              </div>
              {/*
              <div className="col-xl-3 col-lg-3 col-md-3 col-3">
                <Select
	 						  className="joblist-select-container"
	 						  classNamePrefix="react-select"
	 						  placeholder="Select Location..."
                value={this.state.location}
                onChange={(obj) => this.handleSelectChange(obj,'location')}
                options={this.state.location_list}
                isMulti={false}
                defaultMenuIsOpen={false}
              />
              </div>
                <IconButton className="jr-btn jobList-filter-btn jobList-clear-filter-btn"
                      onClick={(e) => this.openModal(e)}>
                  <Badge badgeContent={4}>
                    <ClearIcon fontSize="small" style={{'color':'#00000094'}} />
                  </Badge>
                </IconButton>
                
                  <Badge badgeContent={4} color="primary">
                  <Button variant="contained" color="primary" className="jr-btn jobList-filter-btn"
                      onClick={(e) => this.openModal(e)}>
                    <font size="+1"><i className="la la-filter"/></font>
                    </Button>
                  </Badge>
              */}
              <div className="col-xl-2 col-lg-2 col-md-2 col-2 search-padding">
                  <Button variant="contained" style={{"box-shadow":"none"}} color="primary" className="jr-btn jobList-filter-btn"
                      onClick={(e) => this.openModal(e)}>
                    <i style={{"fontSize":"20px"}} className="la la-filter"/>
                    {(filterCount > 0) ? 
                      <Badge style={{"padding": "0px 7px","color": "white","background-color": "#ff4081fa"}} className="ml-0 py-1 mb-0" color="light rounded-circle">{filterCount}</Badge> : ""}
                  </Button>
              </div>
              <div className="col-xl-1 col-lg-1 col-md-1 col-1 search-padding">
               
              </div>

            </div>
          </div>
        </div>
        <Grid item>
          <div id="inif-container" className={"jr-card p-0 joblist-jr-card" }>
           { isMobile() && !this.state.hasMore && this.state.jobList.length <= 0 &&
              <div className="jobNotFound">
                  <img style={{"width" : "60%"}} src={encodeURI(WEB_IMAGE_URL+"notfound/notfound.png")}/>
                  <span style={{"margin-left":"5px","margin-right":"5px", "font-size": "20px"}}>
                      Oops! No job matches found. Please try another search criteria.
                  </span> 
                </div>
           }
            <List className='p-0' dense={dense}>
              <InfiniteScroll
                    pageStart={0}
                    initialLoad={true}
                    loadMore={this.getMoreJd.bind(this)}
                    hasMore={this.state.hasMore && !this.state.isProcessing}
                    loader={loader}
                    useWindow={false}
                    getScrollParent={() => document.getElementById('inif-container')}
                  >
                    {items}
              </InfiniteScroll>
            </List>
          </div>
        </Grid>
        {/*<Modal
            isOpen={this.state.jobListSearchModalIsOpen}
            closeTimeoutMS={200}
            style={this.state.modalStyleState}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className="jobListModal"
            overlayClassName="jobListModal-Overlay" 
            contentLabel="Example Modal"
          >
          
            <Widget styleName="jr-card-profile">*/}
          <Dialog open={this.state.jobListSearchModalIsOpen} onClose={this.closeModal} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
            <DialogContent id="popup-filter" style={{ width: "400px" }}> 
                  <div className="mb-3">
                    <h3 className="card-title mb-0 mb-md-0 font-weight-bold">Filter <span className="close-popup" onClick={this.closeModal}><i className="la la-close"></i></span></h3>
                
                  </div>
                  <Filter checkedItemsJobType={this.state.checkedItemsJobType} 
                          //checkedItemsIndustry={this.state.checkedItemsIndustry}  
                          locationSelected={this.state.locationSelected}
                          industrySelected={this.state.industrySelected}
                          salary={this.state.salary} 
				 		              experience={this.state.experience}
                          enabledAIEngine={this.state.enabledAIEngine}
                          handleCheckBoxChange={this.updateCheckList.bind(this)}
                          searchJob={this.searchJob.bind(this)}
                          handlePropChange={this.handlePropChange.bind(this)}
                          onFieldChanged={this.inputRangeChanged.bind(this)}
                          autocompleteChange={this.autocompleteChange.bind(this)}
                          clearFilter={this.clearFilter.bind(this)}
                  />
            </DialogContent>
          </Dialog>
           {/*</Widget>
          </Modal>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
   const {countryList, industryList, listLoading} = state.list;
  return {
    countryList,
    industryList,
    listLoading
  };
}

export default withRouter(connect(mapStateToProps)(JobLeftList));
