import React from "react";
import { connect } from 'react-redux';
import Widget from "components/Widget";
import Button from '@material-ui/core/Button';

const SkillTag = (props) => {
  return (
    <div className="jr-entry-sec">
      <Widget styleName="jr-card-profile">
        <div className="mb-3">
          <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Proficiencies</h3>
        </div>
        {(props.skills.length > 0) ? 
          <div>
            <h4>Skills</h4>
            <ul className="list-inline list-inline-3">
                {(props.skills.map(x => { return (x) ? 
                                                      <li key={x} className="list-inline-item mr-0 mb-2">
                                                        <Button variant="contained" className="jr-btn jr-btn-lg bg-white">{x}</Button>
                                                      </li> 
                                                      : "" }))}
                               
            </ul>
          </div>
        : ""}
        {(props.languages.length > 0) ?
          <div>
            <h4>Languages</h4>
            <ul className="list-inline list-inline-3">
                 {(props.languages.map(x => { return (x) ? 
                                                        <li key={x.value} className="list-inline-item mr-0 mb-2">
                                                          <Button variant="contained" className="jr-btn jr-btn-lg bg-white">{x.name}</Button>
                                                        </li> 
                                                        : "" }))}
                                  
            </ul>
          </div> 
        : ""}
      </Widget>
    </div>
  )
};

const mapStateToProps = (state) => {
  const { candidateData } = state.auth;
  return { candidateData }
};


export default connect(mapStateToProps)(SkillTag)
