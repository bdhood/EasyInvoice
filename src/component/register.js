import React from "React";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import PhoneInput from 'react-phone-input-2'
var sha256 = require('js-sha256');
import $ from 'jquery';

import 'react-phone-input-2/lib/style.css'
import './register.css';

import { Form } from "react-bootstrap";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends React.Component {


  register(self) {
    let email = $("#register_email").val();
    let name = $("#register_name").val();
    let phone = $("#register_phone > div > input").val();
    let address = $("#register_address").val();
    let pass = $("#register_password").val();
    let company_name = $("#register_company_name").val();
    let company_address = $("#register_company_address").val();
    var hash = sha256.create();
    hash.update(pass + email);
    let obj = {
        "email": email,
        "name": name,
        "phone": phone,
        "address": address,
        "company_name": company_name,
        "company_address": company_address,
        "password": hash.hex()
    };
    let data = JSON.stringify(obj);
    $.ajax({
      type: 'POST',
      url: "register.php",
      async: false,
      data: data,
      success: function(data) {
        if (data == "CREATED") {
          self.props.setPage('login');
        }
      },
      error: function(e) {
        console.log("jQuery error message = " + e.message);
      }
    });
  }
  render() {
    return (
      <div className="login">
        <Form style={{padding:"15px"}}>

          <div style={{margin: "0 auto"}}>
          <Image src="favicon.png" style={{float:'left', padding:'20px'}} />
          <h1 style={{padding:'20px', float:'left', paddingTop: "40px"}} >Register</h1>
          </div>
          <Form.Group >
            <Form.Control type="text" id="register_name" placeholder="Name" />
          </Form.Group>
          <Form.Group >
            <Form.Control type="email" id="register_email" placeholder="Email" />
          </Form.Group>
          <div style={{paddingBottom: "15px"}} id="register_phone">
          <PhoneInput inputStyle={{width: "100%", height: "38px"}}
            country={'us'}
            value={""}
          />
          </div>
          <Form.Group>
            <Form.Control as="textarea" rows="3" id="register_address"
              placeholder="Billing Address&#13;&#10;City, State&#13;&#10;12345"/>
          </Form.Group>
          <Form.Group >
            <Form.Control type="text" id="register_company_name" placeholder="Company Name" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" rows="3" id="register_company_address"
              placeholder="Company Address&#13;&#10;City, State&#13;&#10;12345"/>
          </Form.Group>
          <Form.Group>
          <Form.Control 
                style={{"WebkitTextSecurity": "disc", "textSecurity": "disc"}} 
                id="register_password" 
                type="current-password" 
                placeholder="Password"/>
          </Form.Group>
          <ButtonGroup style={{display: "flex"}}>
            <Button variant="secondary" onClick={() => this.props.setPage("login")} >Back</Button>
            <Button variant="secondary" onClick={() => this.register(this)} >Create</Button>
          </ButtonGroup>
        </Form>
      </div>
    );
  }
}
