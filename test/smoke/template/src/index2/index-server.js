// "use strict";

// // import React from "react";
// // import img from "../images/logo.png";
// // import { add } from "../commons/utils.js";
// // import largeNumber from "uccs-large-number";
// // import "./index.less";

// const React = require("react");
// const img = require("../images/logo.png");
// const largeNumber = require("uccs-large-number");
// require("./index.less");

// class Search extends React.Component {
//   constructor() {
//     super(...arguments);
//     this.state = {
//       Text: null,
//     };
//   }
//   loadComponent = () => {
//     // import("./text.js").then((Text) => {
//     //   this.setState({ Text: Text.default });
//     // });
//   };
//   render() {
//     const { Text } = this.state;
//     const ret = largeNumber("999", "1");
//     return (
//       <div className="search">
//         react1
//         {ret}
//         {Text && <Text />}
//         <div onClick={this.loadComponent}>点我</div>
//         <img src={img} alt="" />
//       </div>
//     );
//   }
// }

// module.exports = <Search />;
