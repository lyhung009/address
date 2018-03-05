const React = require('react');
const AddressTable = require('./addresses_table');
const {BrowserRouter, Route, Link, Redirect} = require('react-router-dom');
const {fetchAddressesActionCreator} = require('../reducers/addresses');
const {connect} = require('react-redux');
const firebase = require('firebase');
const config = require('../firebase.config');
const {handleAddresses, prepareCSVData} = require('./util');
const {CSVLink} = require('react-csv');
require('./app.scss');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.addressesRef = this
      .props
      .db
      .database()
      .ref('addresses');
    this
      .addressesRef
      .on('value', snapshot => {
        let data = handleAddresses(snapshot.val());
        this
          .props
          .dispatch(fetchAddressesActionCreator(data));
      });
  }

  deleteAddress (addressId) {
    let childRef = this
      .addressesRef
      .child(addressId);
    childRef.remove();
  }

  render () {
    let {
      addresses = []
    } = this.props;
    let data = prepareCSVData(addresses);
    return (
      <div className='app'>
        <Link to="/add">Add a new address</Link>&nbsp;
        <CSVLink data={data} filename={'addresses.csv'}>
          Export
        </CSVLink>
        <AddressTable
          addresses={addresses}
          onDelete={this
          .deleteAddress
          .bind(this)}></AddressTable>
      </div>
    );
  }
};

module.exports = connect(state => ({addresses: state.addresses.all}))(App)
