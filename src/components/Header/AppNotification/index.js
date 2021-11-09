import React,{ Component }  from 'react';
import {withRouter} from 'react-router-dom';
import NotificationItem from './NotificationItem';
import CustomScrollbars from 'util/CustomScrollbars';


class AppNotification extends Component {
  constructor(props) {
    super(props);
  }
  
  redirectPage = (url) => {
    this.props.toggle();
    this.props.history.push(url);
  }
  
  
  render() {
    const notificationList = this.props.notificationList ? this.props.notificationList : [];
    return (
      <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
        <ul className="list-unstyled">
        {
            notificationList.length <= 0 ?
            <div className="recordNotFound" style={{height:'270px'}}>
                        <span>
                            No Notifications.
                        </span> 
                      </div>
          : 
            notificationList.map((notification, index) => 
              <NotificationItem clickFunc={this.redirectPage.bind(this)} key={index} notification={notification}/>
            )
          }
        </ul>
      </CustomScrollbars>
    )
    
  }
  
};

export default withRouter(AppNotification);

