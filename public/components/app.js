const React = require('react');
const {addresses} = require('../data');
const AddressTable = require('./addresses_table');
const {BrowserRouter, Route, Link, Redirect} = require('react-router-dom');
const {fetchAddressesActionCreator} = require('../reducers/addresses');
const {connect} = require('react-redux');
const firebase = require('firebase');
const config = require('../firebase.config');
const {handleAddresses} = require('./util');

class App extends React.Component {
  addressesRef;
  constructor(props){
    super(props);
    this.addressesRef = this.props.db.database().ref('addresses');
    this.addressesRef.on('value', snapshot => {
      this
      .props
      .dispatch(fetchAddressesActionCreator(handleAddresses(snapshot.val())));
    });
  }
  
  deleteAddress(addressId){
    let childRef = this.addressesRef.child(addressId);
    childRef.remove();
  }

  render() {
    const {
      addresses = []
    } = this.props;
    return (
      <div>
        <Link to="/add">Add a new address</Link>
        <AddressTable addresses={addresses} onDelete={this.deleteAddress.bind(this)}></AddressTable>
      </div>
    );
  }
};

module.exports = connect(state => ({addresses: state.addresses.all}))(App)