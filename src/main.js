

import "ka-table/style.scss";
import React from "react";
import ReactDOM from "react-dom";

import App from './component/app';

function noScroll() {
    window.scrollTo(0, 0);
}
window.removeEventListener('scroll', noScroll);

if (!window.location.href.includes("?no-render")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
