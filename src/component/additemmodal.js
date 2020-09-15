import React, { setState } from "react";
import { Form } from "react-bootstrap";
import $ from 'jquery';
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

var format = require('date-format');

export default class AddItemModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {show: true};
    }

    additem(self) {
      let date = $("#additem_date").val()
      let desc = $("#additem_desc").val()
      let qty = $("#additem_qty").val()
      let rate = $("#additem_rate").val()
      let obj = {
        "date": date,
        "desc": desc,
        "qty": qty,
        "rate": rate
      };
      let data = JSON.stringify(obj);
      $.ajax({
        type: 'POST',
        url: "additem.php",
        async: false,
        data: data,
        success: function(data) {
          if (data == "CREATED") {
            self.props.setModal('');
            self.props.getitems();
            return;
          }
          console.log(data);
        },
        error: function(e) {
          console.log("jQuery error message = " + e.message);
        }
      });
    }

    render() {
        return (

          <Modal
            show={this.state.show}
            onHide={() => this.props.setModal('')}
            onShow={() => {document.getElementById("additem_date").value = format("yyyy-MM-dd", new Date());}}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Add expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Control id="additem_date" type="date" defaultValue="2002-09-01" />
              </Form.Group>
              <Form.Group>
                <Form.Control id="additem_desc" type="text" placeholder="Desc." />
              </Form.Group>
              <Form.Group>
               <Form.Control id="additem_qty" type="number" placeholder="Qty." />
              </Form.Group>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control id="additem_rate" type="number" placeholder="Rate" />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.props.setModal('')}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => this.additem(this)}>Add</Button>
            </Modal.Footer>
          </Modal>
        )
    }
}