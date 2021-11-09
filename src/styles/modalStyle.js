const loginModalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflowY             : 'auto' ,
    background            : 'transparent' ,
    border                : 'none' ,
    maxHeight             : '99vh'
  },
  overlay : {
    zIndex                : '4' ,
    background            : 'rgba(0, 0, 0, 0.5)' ,
    overflow              : 'hidden'
  }
};

const signupModalStyle = {
  overflow: 'scroll',
  height: '500px',
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -35%)',
    overflow              : 'initial',
    background            : 'transparent' ,
    border                : 'none' ,
  },
  overlay : {
    zIndex                : '4' ,
    background            : 'rgba(0, 0, 0, 0.5)' ,
    //overflowY             : 'scroll' , 
  }
};

const jobListModalStyle = {
  content : {
    top                   : '10%',
    right                 : 'auto',
    bottom                : 'auto',
    marginLeft            : 'auto',
    marginRight           : 'auto',
    overflow              : 'initial' ,
    background            : 'transparent' ,
    border                : 'none' ,
    width                 : '80%',
    maxWidth              : '400px',
    position              : 'relative'
  },
  overlay : {
    zIndex                : '2' ,
    background            : 'rgba(0, 0, 0, 0.5)' ,
  }
};

const referralModalStyle = {
  content : {
    top                   : '10%',
    left                  : '30%',
    right                 : 'auto',
    bottom                : 'auto',
    position              : 'absolute',
    marginRight           : '-50%',
    overflow              : 'initial' ,
    background            : 'transparent' ,
    border                : 'none' ,
    width                 :'40%'
  },
  overlay : {
    zIndex                : '3' ,
    background            : 'rgba(0, 0, 0, 0.5)' ,
  }
};

const jobContentModalStyle = {
  content : {
    top                   : '10%',
    left                  : '20%',
    right                 : 'auto',
    bottom                : 'auto',
    position              : 'absolute',
    marginRight           : '-50%',
    overflow              : 'initial' ,
    background            : 'transparent' ,
    border                : 'none' ,
    width                 :'60%'
  },
  overlay : {
    zIndex                : '3' ,
    background            : 'rgba(0, 0, 0, 0.5)' ,
  }
};


const adminContactModalStyle = {
  content : {
    top                   : '20%',
    //left                  : '40%',
    left                  : '0px',
    right                 : 'auto',
    bottom                : 'auto',
    overflow              : 'initial' ,
    background            : 'transparent' ,
    border                : 'none' ,
    //width                 :'90%',
    display               :'block',
    marginLeft            : 'auto',
    marginRight           : 'auto',
    position              : 'relative',
  },
  overlay : {
    zIndex                : '3' ,
    background            : 'rgba(0, 0, 0, 0.5)' ,
    width                 : '100%',
  }
};


module.exports = { 
  loginModalStyle: loginModalStyle,
  signupModalStyle: signupModalStyle,
  jobListModalStyle: jobListModalStyle,
  jobContentModalStyle: jobContentModalStyle,
  referralModalStyle: referralModalStyle,
  adminContactModalStyle: adminContactModalStyle
};
