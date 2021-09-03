"use strict";

import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import img from "../images/logo.png";
import { add } from "../commons/utils.js";
import largeNumber from "uccs-large-number";

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null,
    };
  }
  loadComponent = () => {
    import("./text.js").then((Text) => {
      this.setState({ Text: Text.default });
    });
  };
  render() {
    const sum = add(1, 2);
    const { Text } = this.state;
    console.log(sum);
    const ret = largeNumber("999", "1");
    return (
      <div className="search">
        react1
        {ret}
        {Text && <Text />}
        <div onClick={this.loadComponent}>点我</div>
        <img src={img} alt="" />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
