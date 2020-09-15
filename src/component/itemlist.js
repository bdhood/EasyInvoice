import './itemlist.scss';
import "ka-table/style.scss";
import React, { useState } from 'react';
import $ from 'jquery';
var _ = require('lodash');
import Dropdown from 'react-bootstrap/Dropdown'
import AddItemModal from "./additemmodal";
import CreateBillModal from "./createbillmodal";
import Form from 'react-bootstrap/Form';

import { kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode, ActionType } from 'ka-table/enums';
import {
  deleteRow, hideLoading, showLoading, updateData, selectRow, deselectRow, deselectAllRows, selectRowsRange, selectAllRows,
} from 'ka-table/actionCreators';
import 'ka-table/static/icons.scss';

const tableProps = {
  columns: [
    { key: 'selection-cell', style:{width:40,padding:0}},
    { key: 'date', title: 'Date', dataType: DataType.String, style:{width:90,padding:0,paddingLeft:10}},
    { key: 'description', title: 'Desc.', dataType: DataType.String },
    { key: 'quanity', title: 'Qty.', dataType: DataType.String, style:{width:50,padding:0,paddingLeft:10} },
    { key: 'unit_price', title: 'Rate', dataType: DataType.String, style:{width:50,padding:0,paddingLeft:10} },
  ],
  loading: {
    enabled: true,
    text: 'Loading...'
  },
  editingMode: EditingMode.None,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};


const SelectionCell = ({
  rowKeyValue, dispatch, isSelectedRow, selectedRows
}) => {
  return (
    <input
      type='checkbox'
      checked={isSelectedRow}
      onChange={(event) => {
        if (event.nativeEvent.shiftKey){
          dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
        } else if (event.currentTarget.checked) {
          dispatch(selectRow(rowKeyValue));
        } else {
          dispatch(deselectRow(rowKeyValue));
        }
      }}
    />
  );
};

const SelectionHeader = ({
  dispatch, areAllRowsSelected,
}) => {
  return (
    <input
      type='checkbox'
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch(selectAllRows());
        } else {
          dispatch(deselectAllRows());
        }
      }}
    />
  );
};


export default class ItemList extends React.Component {
  logout(self) {
    $.ajax({
      type: 'POST',
      url: "logout.php",
      async: true,
      success: function(data) {
        localStorage.setItem('user_id', '');
        self.props.setPage('login');
      },
      error: function(x, s, e) {
        console.log("jQuery error message = ");
        console.log(x);
        console.log(s);
        console.log(e);
      }
    });
  }
  render() {
    return (
      <div>
        <Dropdown style={{left:"10px", top:"9px", position: "absolute", zIndex:"1"}}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.setModal('additem')}>Add expense</Dropdown.Item>
            <Dropdown.Item onClick={() => this.removeSelected(this)}>Remove selected</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setModal('createinvoice')}>Create invoice</Dropdown.Item>
            <Dropdown.Item onClick={() => this.logout(this)}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <span style={{right:"20px", top:"18px", position: "absolute", color:"white", fontSize:"20"}}>
            { "Welcome, " + localStorage.getItem("user_name").split(" ")[0] }
        </span>
        
        <div style={{maxWidth:"900px", margin:"auto"}}>
          <Table id="itemtable"
            {...this.state.tableProps} 
            childComponents={{
              cellText: {
                content: (props) => {
                  if (props.column.key === 'selection-cell'){
                    return <SelectionCell {...props} />
                  }
                }
              },
              headCell: {
                content: (props) => {
                  if (props.column.key === 'selection-cell'){
                    return <SelectionHeader {...props}/>;
                  }
                }
              }
            }}
            dispatch={this.dispatch} 
          />
          { this.state.modal == "additem" && <AddItemModal getitems={() => this.getitems(this)} setModal={this.setModal}></AddItemModal>}
          { this.state.modal == "createinvoice" && <CreateBillModal getitems={() => this.getitems(this)} setModal={this.setModal} getState={this.props.getState}></CreateBillModal>}
        </div>
      </div>
    )
  }

  getitems(self) {
    let user_id = localStorage.getItem('user_id');
    if (user_id == '') {
      self.logout(self)
    }
    let obj = {
        "user_id": user_id
    };
    let data = JSON.stringify(obj);
    $.ajax({
      type: 'POST',
      url: "getitems.php",
      async: true,
      data: data,
      success: function(data) {
        if (data == "INVALID") {
          return;
        }
        if (data == "Error invalid session") {
          self.logout(self);
        }
        self.dispatch(updateData(JSON.parse(data)));
        self.dispatch(hideLoading());
      },
      error: function(x, s, e) {
        console.log("jQuery error message = ");
        console.log(x);
        console.log(s);
        console.log(e);
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = { tableProps, modal: '', selectedItems: [] };
    this.dispatch = this.dispatch.bind(this);
    this.setModal = this.setModal.bind(this);
    this.getitems(this);
  }

  setModal(modal) {
    this.setState( {
      modal: modal
    });
    this.forceUpdate();
  }

  removeSelected(self) {
    var ids = [];
    for (var i = 0; i < self.state.selectedItems.length; i++) {
      ids.push(self.state.selectedItems[i]);
    }
    self.state.selectedItems = [];
    let data = '[' + ids.join(',') + ']';
    $.ajax({
      type: 'POST',
      url: "removeitems.php",
      async: true,
      data: data,
      success: function(data) {
        self.getitems(self);
      },
      error: function(x, s, e) {
        console.log("jQuery error message = ");
        console.log(x);
        console.log(s);
        console.log(e);
      }
    });
  }

  dispatch(action) {
    switch (action.type) {
      case ActionType.SelectAllRows:
        this.setState({ selectedItems: _.range(this.state.tableProps.data.length) });
        break;
      case ActionType.DeselectAllRows:
        this.setState({ selectedItems: []});
        break;
      case ActionType.SelectRowsRange:
        this.setState({ selectedItems: [...new Set([...this.state.selectedItems, ..._.range(action.rowKeyValueFrom, action.rowKeyValueTo)])]});
        break;
      case ActionType.SelectRow:
        this.setState({ selectedItems: [...new Set([...this.state.selectedItems, ...[action.rowKeyValue]])]});
        break;
      case ActionType.DeselectRow: {
        const index = this.state.selectedItems.indexOf(action.rowKeyValue);
        if (index > -1) {
          this.state.selectedItems.splice(index, 1);
        }
        break;
      }
    }
    this.setState((prevState) => ({
      ...prevState,
      ...{tableProps: kaReducer(prevState.tableProps, action)}
    }));
  }
}
