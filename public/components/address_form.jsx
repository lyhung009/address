import React, {Component} from 'react';
import './address_form.scss'

export default class AddressForm extends Component {
  render() {
    return (
      <div className="address-form">
        <h1 className="title">Add new address</h1>
        <form onSubmit={this.onFormSubmit}>
          <ul className="form-list">
            <li>
              <label>Street Name</label>
              <input type="text" name="street"/>
            </li>
            <li>
              <label>Ward</label>
              <input type="text" name="ward"/>
            </li>
            <li>
              <label>District</label>
              <input type="text" name="district"/>
            </li>
            <li>
              <label>City</label>
              <input type="text" name="city"/>
            </li>
            <li>
              <label>Country</label>
              <input type="text" name="country"/>
            </li>
            <li>
              <input type="submit" value="Submit"/>
              <input type="button" value="Cancel" className="cancel"/>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}