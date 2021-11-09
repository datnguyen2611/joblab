import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Detail from './Detail';

class ExpandDetailBox extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
    };
  }
  

  toggle = () => {
    console.log("toggle");
    this.setState(prevState => ({
      isInterviewDetailExpanded: !prevState.isInterviewDetailExpanded
    }));
  }
  
  render() {
    const { description, hideDescription, showDescription } = this.props;
    const { isInterviewDetailExpanded } = this.state;
    
    return (
      <div>
        {
              isInterviewDetailExpanded
              ?
              <Button size="small" variant="contained" className="mb-0 float-right float-sm-left float-md-right" color="primary" onClick={this.toggle}>
                <small>{hideDescription ? hideDescription : "Hide Detail"}</small>
              </Button>
              :
              <Button size="small" variant="contained" className="mb-0 float-right float-sm-left float-md-right" color="primary" onClick={this.toggle}>
                <small>{hideDescription ? showDescription : "Show Detail"}</small>
              </Button>
            }
            <Detail description={description} open={isInterviewDetailExpanded}/>
      </div>
    );
  }
};


export default connect(null, null)(ExpandDetailBox);