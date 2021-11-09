import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import moment from "moment";

const NotificationItem = ({clickFunc, notification}) => {
  const {pictureUrl, message, createdAt,redirectUrl} = notification;
  return (
    <li className="media" onClick={() => clickFunc(redirectUrl)} style={{"cursor": "pointer"}}>
      <Avatar
        alt={pictureUrl}
        src={pictureUrl}
        className=" mr-2"
      />
      <div className="media-body align-self-center">
        <p className="sub-heading mb-0">{message}</p>
        <span className="meta-date" style={{'float':'right'}}><small>{createdAt == null ? "N/A" : moment(createdAt).format("DD MMM YYYY, HH:mm")}</small></span>
      </div>
    </li>
  );
};

export default NotificationItem;
