import React, {Component} from 'react';
import {addresses} from '../data';
import AddressTable from './addresses_table.jsx'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: addresses
    }
  }
  render() {
    return (
      <div>
        <Link to="/add">Add a new address</Link>
        <AddressTable addresses={this.state.addresses}></AddressTable>
      </div>
    );
  }
}