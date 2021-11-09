import React from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from '@material-ui/core/CircularProgress';


class UploadCV extends React.Component {
  state = {
  };
  
  componentDidMount() {
  }
  
  render() {
    const { isUploadLoading } = this.props;
    
    return (
      <div className="row">
          <div className="col-md-6">
            <div className="mx-auto w-75 my-3">
              <Dropzone className="dropzone" accept='.doc,.docx,.pdf' onDrop={acceptedFiles => this.props.cvUpload(acceptedFiles)}> 
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps({style:{'top':'15%','position': 'relative'}, className: 'dropzone-file-btn'})}>
                    <input {...getInputProps()} />
                    { isUploadLoading ?
                      <CircularProgress color="secondary" className="m-auto" />
                      :
                      <p className="text-center">Drag and drop CV here, or click to select CV.</p>
                    }
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
          <div className="col-md-6 register-text">
            <h3 className="register-title">Upload your CV</h3>
            <h3>Information on this page will be AI-generated </h3>
            <h3>based on your CV.</h3>
          </div>
        </div>
    );
  }
}

export default UploadCV;