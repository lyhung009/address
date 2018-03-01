import React, {Component} from 'react';
import './addresses_table.scss';

export default class AddressesTable extends Component {
  render() {
    const addresses = this.props.addresses.map(address => (
      <tr key={address.id}>
        <td>{address.street}</td>
        <td>{address.ward}</td>
        <td>{address.district}</td>
        <td>{address.city}</td>
        <td>{address.country}</td>
      </tr>
    ));

    return (
      <table className='addresses'>
        <thead>
          <tr>
            <th>Street Name</th>
            <th>Ward</th>
            <th>District</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {addresses}
        </tbody>
      </table>
    );
  }
}