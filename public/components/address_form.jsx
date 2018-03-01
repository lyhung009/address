import React, {Component} from 'react';
import './address_form.scss'

export default class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        street: '',
        ward: '',
        district: '',
        city: '',
        country: ''
      },
      fieldErrors: {}
    };
  }

  onInputChange(evt){
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }

  validate(address){
    const errors = {};
    if(!address.street) errors.street = 'Street name is required';
    if(!address.city || address.city.trim() === ''){
      if(!address.ward) errors.ward = 'Ward is required';
      if(!address.district) errors.district = 'District is required';
    }
    return errors;  
  }

  onFormSubmit(evt){
    const address = this.state.fields;
    const fieldErrors = this.validate(address);
    console.log(fieldErrors)
    this.setState({fieldErrors});

    evt.preventDefault();

    if(Object.keys(fieldErrors).length) return;
  }

  render() {
    return (
      <div className="address-form">
        <h1 className="title">Add new address</h1>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <ul className="form-list">
            <li>
              <label>Street Name</label>
              <input type="text" name="street" value={this.state.fields.street}
              onChange={this.onInputChange.bind(this)}/>
              <span style={{color: 'red'}}>{this.state.fieldErrors.street}</span>
            </li>
            <li>
              <label>Ward</label>
              <input type="text" name="ward" value={this.state.fields.ward}
              onChange={this.onInputChange.bind(this)}/>
              <span style={{color: 'red'}}>{this.state.fieldErrors.ward}</span>             
            </li>
            <li>
              <label>District</label>
              <input type="text" name="district" value={this.state.fields.district}
              onChange={this.onInputChange.bind(this)}/>
              <span style={{color: 'red'}}>{this.state.fieldErrors.district}</span>
            </li>
            <li>
              <label>City</label>
              <input type="text" name="city" value={this.state.fields.city}
              onChange={this.onInputChange.bind(this)}/>
              <span style={{color: 'red'}}>{this.state.fieldErrors.city}</span>
            </li>
            <li>
              <label>Country</label>
              <input type="text" name="country" value={this.state.fields.country}
              onChange={this.onInputChange.bind(this)}/>
              <span style={{color: 'red'}}>{this.state.fieldErrors.country  }</span>
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