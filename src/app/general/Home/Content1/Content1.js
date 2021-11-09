import { Button } from "@material-ui/core";
import React, { Component } from "react";
import "./Content1.scss";
function Content1(props) {
  return (
    <div className="content-1-wrapper">
      <div className="css-v33p9q">
        <div>
          <div className="css-15kdgig">
            <div className="css-otopad">
              <div className="css-4jx5t6">
                Join Asia's fastest growing hiring platform enabling the future
                of work
              </div>
              <h1 className="ui inverted center aligned header css-7mgo4g">
                Find jobs &amp; hire talent. Anywhere.
              </h1>
            </div>
          </div>
          <div className="css-1i6nzj8">
            <div className="css-ljcuwr">
              <div className="content">
                <Button className="css-11lhduh">Find jobs</Button>
                <Button className="css-1uc6qo7">Find talent</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="css-5vx9ej">
          <div
            title
            role="button"
            aria-label="animation"
            tabIndex={0}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              margin: "0px auto",
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Content1;
