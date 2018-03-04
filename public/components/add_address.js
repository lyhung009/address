const React = require('react');
const AddressForm = require('./address_form');
const {withRouter} = require('react-router-dom');
const {connect} = require('react-redux');

class AddAddress extends React.Component {
  constructor (props) {
    super(props);
    this.addressesRef = this.props.db.database().ref('addresses');
  }
  goBack () {
    this.props.history.goBack();
  }

  addAddress (address) {
    this.addressesRef.push(address);
    this.goBack();
  }

  render () {
    return (
      <div>
        <h1 className="title">Add new address</h1>
        <AddressForm onSubmit={this.addAddress.bind(this)} goBack={this.goBack.bind(this)}></AddressForm>
      </div>
    )
  }
}

module.exports = withRouter(connect()(AddAddress));
