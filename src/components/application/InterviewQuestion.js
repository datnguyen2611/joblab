import React, {Component} from "react";
import Widget from "components/Widget";
import moment from "moment";
//import WidgetHeader from "components/WidgetHeader/index";


class InterviewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0, competitiveness: 70};
  }
  
  render() {
    const {deadline, timeZone, timeLimit, interviewQuestion} = this.props;
    return (
      <div className="jr-entry-sec">
        <Widget styleName="jr-card-profile">
          <div className="d-flex">
            <h3 className="card-title mr-auto mb-1 mb-md-3">Interview Questions</h3>
          </div>
          <div className="interview-question-text interview-question-instruction">
            <span>Instructions:</span>
            <ul>
              <li>Please record a video to answer the questions below.</li>
              <li>Deadline: {deadline != null && timeZone != null ? moment(deadline).tz(timeZone).format("YYYY/MM/DD h:mm a z") : "N/A"}</li>
              <li>Time limit: {timeLimit != null ? timeLimit + " minutes" : "N/A"}</li>
            </ul>
          </div>
          <div className="interview-question-text">
             { interviewQuestion &&
                          interviewQuestion.split("\n").map( obj => {
                            return(obj) ? <p className="mb-0">{obj}</p> : ""
                          })
             }
            {/*
            <p><p style={{"font-size":"15px","font-weight":"800"}}>Question 1:</p>What is your name?</p>
            <p><p style={{"font-size":"15px","font-weight":"800"}}>Question 2:</p>What is your favourite pet?</p>
            */}
          </div>
        </Widget>
      </div>
    )
  }
};

export default InterviewQuestion;