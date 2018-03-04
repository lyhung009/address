const React = require('react');
const {Link} = require('react-router-dom');
require('./addresses_table.scss');

class AddressesTable extends React.Component {
  onDelete (evt, id) {
    evt.preventDefault();
    this.props.onDelete(id);
  }
  render () {
    const addresses = this
      .props
      .addresses
      .map((address) => (
        <tr key={address.id}>
          <td>{address.street}</td>
          <td>{address.ward}</td>
          <td>{address.district}</td>
          <td>{address.city}</td>
          <td>{address.country}</td>
          <td>
            <Link to={{
              pathname: `/edit/${address.id}`
            }}>Edit</Link> <Link to='/' onClick={(e) => this.onDelete(e, address.id)}>Delete</Link>
          </td>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses}
        </tbody>
      </table>
    );
  }
}

module.exports = AddressesTable;
