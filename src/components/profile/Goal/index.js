import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Widget from "components/Widget";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { requestInitUser } from 'actions/Auth';  
import GoalEdit from './GoalEdit';

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }
  
  componentDidMount() {
    if (this.props.isEdit)
      this.setState({ isEdit: this.props.isEdit });
  }
  
  editCancel = () => {
    this.setState({ isEdit: false })
  }
  
  render() {
    const userRole = this.props.userRole;
    const { goals } = this.props.candidateData;
    const { getUserData } = this.props;
    const { isEdit } = this.state;
    
    return (
      <Widget styleName="jr-card-profile">
        <div className="d-flex">
          <h3 className="card-title mr-auto mb-1 mb-md-3">Motivations</h3>
          { (userRole=="candidate" || userRole=="admin") && !isEdit && 
            <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => this.setState({ isEdit: true })}>
              <i class="zmdi zmdi-edit"/>
            </IconButton>
          }
        </div>
        
        { (userRole=="candidate" || userRole=="admin") && isEdit 
          ?
          <GoalEdit candidateData={this.props.candidateData} cancel={this.editCancel} refresh={getUserData} />
          :
          <div>
            <ul className="list-inline list-inline-3">
              {goals && goals.map((goal, index) =>
                <li key={index} className="list-inline-item mr-0 mb-2">
                  <Button variant="contained" className="jr-btn jr-btn-lg bg-white">{goal}</Button>
                </li>
              )}
            </ul>
          </div>
        }
      </Widget>
    )
  }
}

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(null, mapDispatchToProps)(Goal));
