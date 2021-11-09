import React, { Component, Fragment } from "react";
import Expand from "react-expand-animated";

import {
  Header,
  Main,
  BoxToggle,
  BoxExpand,
  BoxExpand1,
  Button,
  ExpandBoxes
} from "./Detail.styles.js";

class Detail extends Component {
  
  state = { open: false };

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const styles = { 
      open: { background: "#ecf0f1" }
    };
    const transitions = ["height", "opacity", "background"];
    const description = this.props.description;

    return (
      <Fragment>
        <Main>
          <Expand
            open={this.props.open}
            duration={500}
            styles={styles}
            transitions={transitions}
          >
            <ExpandBoxes>
              <BoxExpand>
                { description && description.split("\n").map((text, index) => (
                  text && text.replace('*','') &&
        		 			<p style={{"text-align": "left"}} key={index}>- {text.replace('*','')}</p>
        		 		))}
              </BoxExpand>
              {/*<BoxExpand1>Hallo</BoxExpand1>*/}
            </ExpandBoxes>
          </Expand>
        </Main>
      </Fragment>
    );
  }
}

export default Detail;
