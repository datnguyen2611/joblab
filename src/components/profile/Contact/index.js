import React, {Component} from "react";
import Widget from "components/Widget";
import IconButton from '@material-ui/core/IconButton';
import ContactEdit from "./ContactEdit";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }
  
  editCancel = () => {
    this.setState({ isEdit: false });
  }

  render(){
    //const classes = useStyles();
    const { isEdit } = this.state;
    const userRole = this.props.userRole;
    const { email, phone } = this.props.userData;
    const { getUserData } = this.props;
    return (
      <Widget styleName="jr-card-profile-sm">
        <div className="d-flex">
          <h3 className="card-title mr-auto mb-1 mb-md-3">Contact</h3>
          { (userRole=="candidate" || userRole=="admin") && !isEdit &&
            <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => this.setState({ isEdit: true })}>
              <i class="zmdi zmdi-edit"/>
            </IconButton>
          }
        </div>
        { (userRole=="candidate" || userRole=="admin") && isEdit 
          ?
          <ContactEdit userData={this.props.userData} cancel={this.editCancel} refresh={getUserData}/>
          :
          <div>
            <div className="media align-items-center flex-nowrap jr-pro-contact-list">
              <div className="mr-3">
                <i className={`zmdi zmdi-email jr-fs-xxl text-grey`}/>
              </div>
              <div className="media-body">
                <div>
                  <span className="mb-0 text-grey jr-fs-sm">Email</span>
                  <p className="mb-0"><a className="jr-link" href={"mailto:"+email}>{email}</a></p>
                </div>
              </div>
            </div>
            <div className="media align-items-center flex-nowrap jr-pro-contact-list">
              <div className="mr-3">
                <i className={`zmdi zmdi-phone jr-fs-xxl text-grey`}/>
              </div>
              <div className="media-body">
                <div>
                  <span className="mb-0 text-grey jr-fs-sm">Phone</span>
                  <p className="mb-0"><a className="jr-link" href={phone==null ? "" : "tel:"+phone.dial+phone.number}>
                    {phone==null ? "N/A" : phone.dial+" "+phone.number}
                  </a></p>
                </div>
              </div>
            </div>
            {/*<div className="media align-items-center flex-nowrap jr-pro-contact-list">
              <div className="mr-3">
                <i className={`zmdi zmdi-link jr-fs-xxl text-grey`}/>
              </div>
              <div className="media-body">
                <span className="mb-0 text-grey jr-fs-sm">LinkedIn Profile</span>
                <p className="mb-0"><a className="jr-link" href="https://www.linkedin.com">https://www.linkedin.com</a></p>
              </div>
            </div>*/}
            {/*contactList.map((data, index) =>
              <div key={index} className="media align-items-center flex-nowrap jr-pro-contact-list">
                <div className="mr-3">
                  <i className={`zmdi zmdi-${data.icon} jr-fs-xxl text-grey`}/>
                </div>
                <div className="media-body">
                  <span className="mb-0 text-grey jr-fs-sm">{data.title}</span>
                  <p className="mb-0">{data.desc}</p>
                </div>
              </div>
            )*/}
          </div>
        }
      </Widget>
    )
  }
}

export default Contact;
