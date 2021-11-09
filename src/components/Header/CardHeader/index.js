import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import CardMenu from './CardMenu';

class CardHeader extends React.Component {


  onOptionMenuSelect = event => {
    this.setState({menuState: true, anchorEl: event.currentTarget});
  };
  handleRequestClose = () => {
    this.setState({menuState: false});
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
    }
  }

  render() {
    const {heading, subHeading} = this.props;
    let {styleName} = this.props;
    const {anchorEl, menuState} = this.state;
    return (
      <div className={`jr-card-header d-flex align-items-start ${styleName}`}>
        <div className="mr-auto">
          <h3 className="card-heading">{heading}</h3>
          {subHeading && <p className="sub-heading">{subHeading}</p>}
        </div>
        {/*
        <Button className="jr-btn mt-n1 mr-n2" color="primary">
          <i className="zmdi zmdi-plus zmdi-hc-lg"/>
          <span>Add New {heading}</span>
        </Button>

        <IconButton className="icon-btn text-dark" onClick={this.onOptionMenuSelect.bind(this)}>
          <i className="zmdi zmdi-chevron-down"/>
        </IconButton>
        <CardMenu menuState={menuState} anchorEl={anchorEl}
                  handleRequestClose={this.handleRequestClose.bind(this)}/>*/}
      </div>
    )
  }
}

export default CardHeader;
CardHeader.defaultProps = {
  styleName: '',
  subHeading: ''
};

