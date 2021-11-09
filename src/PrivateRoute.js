import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: "",
      isLoggedin: false,
      userType: '',
      isVerified: true,//false,
      isCompleted: true,//false,
      isPageReady: false,
      isLoadReady: false
    }
  }
  
  componentDidMount() {
    
    this.checkStatus();
    
    this.setState({
      isPageReady: true,
    });
    
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if(oldProps !== newProps) {
      this.checkStatus();
    }
  }
  
  checkStatus = () => {
    //console.log(this.props.userType)
    if(!this.props.userLoading) 
        { 
          this.setState({
            userType: this.props.userType,
            isLoggedin: this.props.isLoggedin, 
            isVerified: (this.props.userData.isVerified == null) ? false : this.props.userData.isVerified,
            isCompleted: (this.props.candidateData.isCompleted == null) ? false : this.props.candidateData.isCompleted,
            pageRole: (this.props.pageRole == null) ? "" : this.props.pageRole,
            isRedirect: (this.props.isRedirect == null) ? "" : this.props.isRedirect,
            isLoadReady: true
          });
        }
        else
        {
          this.setState({
            isLoadReady: false
          });
        }
  }
  
  render() {
    const { component: Component, ...rest } = this.props;
    const { userType, isCompleted, isVerified, isLoggedin, pageRole, isRedirect, isPageReady, isLoadReady } = this.state;
    //console.log(isPageReady+","+isLoadReady +","+isLoggedin);
    return (
        
    <Route
      {...rest}
      render={props => 
        ((!isPageReady) || (!isLoadReady && !isLoggedin)) ? (null) : (
          (isLoggedin) ? (
            isVerified || (isRedirect == "Verification") || (isRedirect == "Register") ? (
              (pageRole.includes(userType) || pageRole == 'all') ? (
                (userType == 'candidate') ? (
                  //isCompleted || (isRedirect == "Verification") || (isRedirect == "Register") ? (
                    (isRedirect == "Verification" && isVerified) ? <Redirect to="/" /> : (
                                      (isRedirect == "Register" && isCompleted) ? <Redirect to="/" />  
                                                                                  : <Component {...rest} {...props} />)
                  //) : (
                  //  <Redirect to="/candidate/register" />
                  //)
                ) : ( (isRedirect == "Verification" && isVerified) ? <Redirect to="/" /> : (
                                      (isRedirect == "Register" && isCompleted) ? <Redirect to="/" />  
                                                                                  : <Component {...rest} {...props} />)
                )
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/verification" />
            )
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        )
      }
    />
  );
  }

}

const mapStateToProps = (state) => {
  const { userLoading,isLoggedin,userType,userData,candidateData, } = state.auth;
  return { userLoading,isLoggedin,userType,userData,candidateData }
};

export default withRouter(
  connect(
    mapStateToProps
  )(PrivateRoute)
);
