import React, { Component } from 'react';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import JobContent from 'components/JobContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      activeJob: props.job ? props.job : ''
    }
    
  }
  
  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    var jobId = this.props.match.params.jobId;
    console.log(this.props.match.params.jobId);
    
    setTimeout(() => {
      this.setState({ loader: false,activeJob : jobId });
    }, 500);
  }
  
  componentDidUpdate(prevProps) {

      var oldJobId = prevProps.match.params.jobId;
      var newJobId = this.props.match.params.jobId;
      if(oldJobId !== newJobId)
        this.setState({activeJob : newJobId });

  }

  componentWillUnmount() {
    //for mobile view store list
    if(this.props.history.location.pathname !== "/joblist")
      window.localStorage.removeItem("previousInfo");
  }
  
   render() {
    const { loader } = this.state;
    return (
      <div className="app-wrapper joblist-wrapper">
        { loader ?
          <div className="loader-view"
               style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
            <CircularProgress/>
            <Helmet>
              <title>JobsLab</title>
            </Helmet>
          </div> : 
          
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <JobContent activeJob={this.state.activeJob} isSearch={false} isNotInsideList={true} />
            </div>
          </div>
        }
      </div>
      )
  }
}

export default Job;