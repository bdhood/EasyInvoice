import React, { useRef } from "react";
import Login from "./login";
import Register from "./register";
import ItemList from "./itemlist";
import Navbar from 'react-bootstrap/Navbar';


import 'ka-table/style.scss';
import 'ka-table/static/icons.scss';

export default class App extends React.Component {
  constructor() {
    super();
  
    this.state = {
      activePage: 'login',
      user_id: '',
      start_time: 0
    }

    this.setPage = this.setPage.bind(this);
    this.setSession = this.setSession.bind(this)
    this.getState = this.getState.bind(this);
  }

  setPage(page) {
    this.setState( {
      activePage: page
    });
    this.forceUpdate();
  }

  setSession(sessionId, start_time) {
    this.setState( {
      user_id: sessionId,
      start_time: start_time
    });
  }

  getState() {
    return this.state;
  }

  render() {
    var page = this.state.activePage;
    let auth = localStorage.getItem("user_id") || "";
    if (auth != "") {
      if (page != 'items') {
        page = 'items';
      }
    }
      return (
        <div style={{overflow: "hidden", height: "100%"}} >
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          { page == 'items' && <Navbar.Brand style={{paddingLeft:"60px"}}>Easy Invoice</Navbar.Brand>}
          { page != 'items' && <Navbar.Brand>Easy Invoice</Navbar.Brand>}
          </Navbar>
          { page == 'login' && <Login setPage={this.setPage} setSession={this.setSession} /> }
          { page == 'register' && <Register setPage={this.setPage} /> }
          { page == 'items' && <ItemList getState={this.getState} setPage={this.setPage} setModal={this.setModal}/> }
        </div>
      );
  }
}