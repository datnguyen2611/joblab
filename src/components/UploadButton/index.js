import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const UploadButton = ({name, accept, onChange, isLoading}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept={accept}
        className={classes.input}
        id="contained-button-file"
        //multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" className="jr-btn jr-btn-lg text-white">
          { isLoading && <CircularProgress color="secondary" size={20} className="mr-2" /> }
          <i className="zmdi zmdi-upload zmdi-hc-fw"/>
          {name}
        </Button>
      </label>
    </div>
  );
}

export default UploadButton;