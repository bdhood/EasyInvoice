import React, { setState } from "react";
import { Form } from "react-bootstrap";
import $ from "jquery";
import _ from "lodash";

var format = require("date-format");

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default class CreateBillModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  generate(self) {
    let user_id = localStorage.getItem("user_id");
    let start_date = $("#createbill_start_date").val();
    let end_date = $("#createbill_end_date").val();
    let obj = {
      user_id: user_id,
      start_date: start_date,
      end_date: end_date,
    };
    let data = JSON.stringify(obj);
    $.ajax({
      type: "POST",
      url: "getreport.php",
      async: true,
      data: data,
      success: function (data) {
        self.print_report(JSON.parse(data));
      },
      error: function (x, s, e) {
        console.log("jQuery error message = ");
        console.log(x);
        console.log(s);
        console.log(e);
      },
    });
  }

  print_report(data) {
    console.log(data);
    const printableBody = document.createElement("iframe");
    printableBody.setAttribute(
      "style",
      "visibility: hidden; height: 0; width: 0; position: absolute;"
    );
    printableBody.setAttribute("id", "objectExporterPrintableBodyId");
    printableBody.srcdoc = `<html xmlns="http://www.w3.org/1999/xhtml">
      <head>
          <title>Print</title>
          <style type="text/css" media="print">
          @page 
          {
              size:  auto;   /* auto is the initial value */
              margin: 0mm;  /* this affects the margin in the printer settings */
          }
      
          html
          {
              margin: 0px;  /* this affects the margin on the html before sending to printer */
          }

          .users_name {
            color: #6d64e8;
            font-family: calibri;
            font-size: 45px;
          }

          .plain_text {
            color: #666666;
            font-family: calibri;
            font-size: 20px;
            padding-top:5px;
          }

          .invoice_text {
            color: #283592;
            font-family: calibri;
            font-size: 65px;
            font-weight: bold;
          }

          .submit_on {
            color: #e01b84;
            font-family: calibri;
            font-size: 28px;
            font-weight: bold;
          }

          .header_title {
            color: #434343;
            font-family: calibri;
            font-size: 28px;
            font-weight: bold;
          }

          .total {
            color: #2a3990;
            font-family: calibri;
            font-size: 22px;
            text-align: left;
            padding-right:20px;
          }
          .total_value {
            color: #e01b84;
            font-family: calibri;
            font-size: 40px;
            font-weight: bold;
            padding-right:10px;
          }

          table {
            border-collapse:collapse;
            width: 100%;
          }

          th {
            color: #2a3990;
            font-family: calibri;
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            padding: 8px;
          }

          td {
            color: #666666;
            font-family: calibri;
            font-size: 16px;
            text-align: left;
            padding: 4px;
          }

          tr:nth-child(even) {background-color: #f2f2f2;}

          hr.solid {
            border-top: 1px solid #666;
          }

          body
          {
              margin: 0;
          }
          </style>
      </head>
      </html>`;
    document.getElementsByTagName("body")[0].appendChild(printableBody);
    const printableElements = document.getElementById(
      "objectExporterPrintableBodyId"
    );
    const { detect } = require("detect-browser");
    printableBody.onload = () => {
      // Detect the browser information
      const browser = detect();

      // Define a printable document
      let printableDocument =
        printableElements.contentWindow || printableElements.contentDocument;

      // Check if there is document element
      if (printableDocument.document)
        printableDocument = printableDocument.document;

      printableDocument.body.innerHTML =
        `
          <div style="top:10mm;left:20mm;position:absolute;width:176mm">
            <span class="users_name">` +
        data.user_data.name +
        `</span>
            <br>
            <span class="plain_text">` +
        data.user_data.address.replace(/\\n/g, "\n").split("\n")[0] +
        `</span>
            <br>
            <span class="plain_text">` +
        data.user_data.address
          .replace(/\\n/g, "\n")
          .split("\n")
          .slice(1)
          .join(" ") +
        `</span>
            <br>
            <span class="plain_text">` +
        data.user_data.phone +
        `</span>
            <br><br>
            <span class="invoice_text">Invoice</span>
            <br>
            <span class="submit_on">Submitted on ` +
        format.asString("MM/dd/yyyy", new Date()) +
        `</span>
            <br><br>
            <div>
              <div style="float:left">
                <span class="header_title">Invoice for</span>
                <br>
                <span class="plain_text">` +
        data.user_data.company_name +
        `</span>                
                <br>
                <span class="plain_text">` +
        data.user_data.company_address.replace(/\\n/g, "\n").split("\n")[0] +
        `</span>
                <br>
                <span class="plain_text">` +
        data.user_data.company_address
          .replace(/\\n/g, "\n")
          .split("\n")
          .slice(1)
          .join(" ") +
        `</span>
                <br>
              </div>
              <div style="float:left;padding-left:50mm">
                <span class="header_title">Payable to</span>
                <br>
                <span class="plain_text">` +
        data.user_data.name +
        `</span>                
                <br>
                <br>
                <span class="header_title">Invoice #</span>
                <br>
                <span class="plain_text">` +
        Math.floor(Math.random() * 899999 + 100000).toString() +
        `</span>                
                <br>
                <br>
              </div>
            </div>
            <br>
            <div style="height:35mm"></div>
            <hr class="solid"></hr>
            <table style="width:100%">
              <thead><tr>
                <th>Date</th>
                <th>Description</th> 
                <th style="text-align:right;padding-right:14px">Qty</th>
                <th style="text-align:right;padding-right:14px">Rate</th> 
                <th style="text-align:right;padding-right:14px">Total</th>
              </tr></thead>
              <tbody>
              ` +
        _.map(data.items, function (i) {
          return (
            `
                <tr>
                  <td>` +
            i.date +
            `</td>
                  <td>` +
            i.description +
            `</td>
                  <td style="text-align:right;padding-right:14px">` +
            i.quanity.toString() +
            `</td>
                  <td style="text-align:right;padding-right:14px">` +
            i.unit_price.toString() +
            `.00</td>
                  <td style="text-align:right;padding-right:14px">$` +
            (i.quanity * i.unit_price).toString() +
            `.00</td>
                </tr>`
          );
        }).join("") +
        `
              </tbody>
            </table>
            <hr class="solid"></hr>
            <div>
              <div style="float:right">
                <span class="total_value">$` +
        _.sumBy(data.items, function (i) {
          return i.quanity * i.unit_price;
        }) +
        `.00</span>
              </div>
              <div style="padding-top:13px;float:right">
                <span class="total">Total</span>
              </div>              
            </div>
          </div>
        `;

      if (localStorage.getItem("user_name") == "Test Account") {
        $("body > div").remove();
        $("head").append(
          printableElements.contentWindow.document.head.innerHTML
        );
        $("body").append(
          printableElements.contentWindow.document.body.innerHTML
        );
        $("body > iframe").remove();
        $("head > style").removeAttr("media");
        $("body").css({ width: "8.5in", height: "11in" });
      } else {
        // Prepare the printable for the print
        printableElements.focus();
        // Check the if the browser is Edge or Internet Explorer
        if (browser.name === "edge" || browser.name === "ie") {
          printableElements.contentWindow.document.execCommand(
            "print",
            false,
            null
          );
        } else {
          // All other browsers
          printableElements.contentWindow.print();
        }
      }
    };
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={() => this.props.setModal("")}
        onShow={() => {
          document.getElementById("createbill_start_date").value = format(
            "yyyy-MM-01",
            new Date()
          );
          if (new Date().getMonth() == 11) {
            //document.getElementById("createbill_end_date").value = (new Date().getFullYear() + 1).toString() + "-01-01";
          } else if (new Date().getMonth() >= 8) {
            document.getElementById("createbill_end_date").value =
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 2).toString() +
              "-01";
          } else {
            document.getElementById("createbill_end_date").value =
              new Date().getFullYear() +
              "-0" +
              (new Date().getMonth() + 2).toString() +
              "-01";
          }
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Text className="text-muted">Start date (inclusive)</Form.Text>
            <Form.Control id="createbill_start_date" type="date" />
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted">End date (inclusive)</Form.Text>
            <Form.Control id="createbill_end_date" type="date" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.setModal("")}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => this.generate(this)}>
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
