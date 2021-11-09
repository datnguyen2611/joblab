import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';
import {SPECIALITY_LENGTH} from 'constants/AutoSuggest';

class GoalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
    };
  }
  
  componentDidMount() {
    if (this.props.candidateData)
      this.setState({
        goals: this.props.candidateData.goals==null ? [] : this.props.candidateData.goals,
      });
  }
  
  autocompleteChange = (e, value, name) => {
    //var name = e.target.id.split('-')[0];
    this.setState({ [name]: value });
  }
  
  editSave = () => {
    const data = {
      candId: this.props.candidateData && this.props.candidateData._id,//this.props.match.params.Id,
      goals: this.state.goals.map(obj => obj.value),
    };
    axios.post('/api/candidates/set/profile/goal/update', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        this.props.refresh();
        //this.props.requestInitUser();
        notification.success("Your Profile has been updated successfully.");
        this.props.cancel(); 
      }
      else {
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  render() {
    const { goals } = this.state;
    const { goalList } = this.props;
    
    return (
      <div>
        <ul className="list-inline list-inline-3">
          <Autocomplete
            multiple
            id="goals"
            options={goalList}
            getOptionLabel={option => option.label}
            //value={language}
            value={goalList.filter(item => (goals ? goals : []).find(i => i.value === item.value))}
            autoHighlight={true}
            blurOnSelect={'touch'}
            filterSelectedOptions={true}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Career Goals"
                placeholder=""
                fullWidth
              />
            )}
            onChange={(e, value) => this.autocompleteChange(e, value, 'goals')}
          />  
        </ul>
        
        <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
        <Button className="mt-2 mr-2" onClick={this.props.cancel}>Cancel</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { goalList } = state.list;
  return { goalList };
};

const mapDispatchToProps = {
  requestInitUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoalEdit));
