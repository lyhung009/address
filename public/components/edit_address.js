const React = require('react');
const AddressForm = require('./address_form');
const {withRouter} = require('react-router-dom');
const {connect} = require('react-redux');
const {editAddressActionCreator, fetchAddressActionCreator} = require('../reducers/addresses');

class EditAddress extends React.Component {
  constructor (props) {
    super(props);
    this.addressesRef = this.props.db.database().ref('addresses');
    this.addressesRef.on('value', snapshot => {
      let address = snapshot.val()[this.props.match.params.id];
      if (address) {
        address.id = this.props.match.params.id;
        this
        .props
        .dispatch(fetchAddressActionCreator(address));
      }
    });
  }
  goBack () {
    this.props.history.goBack();
  }

  editAddress (address) {
    let childRef = this.props.db.database().ref('addresses').child(this.props.match.params.id);
    childRef.update(address);
    this.goBack();
  }

  render () {
    return (
      <div>
        <h1 className="title">Edit address</h1>
        <AddressForm goBack={this.goBack.bind(this)} address={this.props.address}
          onSubmit={this.editAddress.bind(this)}></AddressForm>
      </div>
    )
  }
}

module.exports = withRouter(connect(state => ({
  address: state.addresses.current
}))(EditAddress));
