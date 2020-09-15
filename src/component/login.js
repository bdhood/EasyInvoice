import React from "React";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import $ from 'jquery';
var sha256 = require('js-sha256');
import { Form } from "react-bootstrap";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditorFormatListBulleted } from "material-ui/svg-icons";
export default class Login extends React.Component {

  login(self) {
      let email = $('#login_email').val();
      let password = $("#login_password").val();
      var hash = sha256.create();
      hash.update(password + email);
      let obj = {
          "email": email,
          "password": hash.hex()
      };
      let data = JSON.stringify(obj);
      $.ajax({
        type: 'POST',
        url: "login.php",
        async: false,
        data: data,
        success: function(data) {
          if (data == "INVALID") {
            alert("Invalid username/password");
            return;
          }
          let json = JSON.parse(data);
          self.props.setSession(json['user_id'], json['start_time'])
          localStorage.setItem('user_id', json['user_id']);
          localStorage.setItem('user_name', json['user_name']);
          self.props.setPage('items');
        },
        error: function(x, s, e) {
          localStorage.setItem('user_id', '');
          console.log("jQuery error message = ");
          console.log(x);
          console.log(s);
          console.log(e);
        }
      });
  }

  render() {
    return (
      <div className="login">
        <Form style={{padding:"15px"}}>
          <div style={{margin: "0 auto"}}>
          <Image src="favicon.png" style={{float:'left', padding:'20px'}} />
          <h1 style={{padding:'20px', float:'left', paddingTop: "40px"}} >Login</h1>
          </div>
          <Form.Group>
            <Form.Control id="login_email" type="email" placeholder="Email" onKeyPress={this.handleKeyPress} />
          </Form.Group>
          <Form.Group >
            <Form.Control 
                style={{"WebkitTextSecurity": "disc", "textSecurity": "disc"}} 
                id="login_password" 
                type="current-password" 
                placeholder="Password"/>
          </Form.Group>
          <ButtonGroup style={{display: "flex"}}>
            <Button variant="primary" onClick={() => this.props.setPage('register')}>Register</Button>
            <Button variant="primary" onClick={() => this.login(this)} >Login</Button>
          </ButtonGroup>
        </Form>
      </div>
    );
  }
}
