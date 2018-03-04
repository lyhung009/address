const React = require('react');
const {createClient} = require("@google/maps");
const key = require('../googlemaps.config');
const {parseAddress} = require('./util');
const {compose, withProps} = require("recompose");
const {withScriptjs, withGoogleMap, GoogleMap, Marker} = require("react-google-maps");
require('./address_form.scss');

const MyMapComponent = compose(withProps({
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}
      &v=3.exp&libraries=geometry,drawing,places`, loadingElement: <div style={{
    height: `100%`
  }}/>,
  containerElement: <div style={{
    height: `400px`
  }}/>,
  mapElement: <div style={{
      height: `100%`
    }}/>
}), withScriptjs, withGoogleMap)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
    lat: 21.028511,
    lng: 105.804817
  }}></GoogleMap>
));

class AddressForm extends React.Component {
  googleMapsClient;
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

    this.googleMapsClient = createClient({key: key});
  }

  componentWillReceiveProps(nextProps) {
    const {
      address = {
        street : '',
        ward : '',
        district : '',
        city : '',
        country : ''
      }
    } = nextProps;
    this.handleAddressChange(address);
  }

  handleAddressChange(address) {
    let fields = {
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
      country: address.country
    };

    this.setState({fields: fields});
  }

  onInputChange(evt) {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields});
  }

  pickUpCurrentLocation() {
    if (navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition(position => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          this
            .googleMapsClient
            .reverseGeocode({
              latlng: [latitude, longitude]
            }, (err, response) => {
              if (!err) {
                this.handleAddressChange(parseAddress(response.json.results[0].address_components));
              }
            });
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  validate(address) {
    const errors = {};
    if (!address.street) 
      errors.street = 'Street name is required';
    if (!address.city || address.city.trim() === '') {
      if (!address.ward) 
        errors.ward = 'Ward is required';
      if (!address.district) 
        errors.district = 'District is required';
      }
    return errors;
  }

  onFormSubmit(evt) {
    const address = this.state.fields;
    const fieldErrors = this.validate(address);
    this.setState({fieldErrors});

    evt.preventDefault();

    if (Object.keys(fieldErrors).length) 
      return;
    
    this
      .props
      .onSubmit(address);
  }

  render() {
    return (
      <div className="container">
        <div className="address-form">
          <form onSubmit={this
            .onFormSubmit
            .bind(this)}>
            <ul className="form-list">
              <li>
                <label>Street Name</label>
                <input
                  type="text"
                  name="street"
                  value={this.state.fields.street}
                  onChange={this
                  .onInputChange
                  .bind(this)}/>
                <span style={{
                  color: 'red'
                }}>{this.state.fieldErrors.street}</span>
              </li>
              <li>
                <label>Ward</label>
                <input
                  type="text"
                  name="ward"
                  value={this.state.fields.ward}
                  onChange={this
                  .onInputChange
                  .bind(this)}/>
                <span style={{
                  color: 'red'
                }}>{this.state.fieldErrors.ward}</span>
              </li>
              <li>
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={this.state.fields.district}
                  onChange={this
                  .onInputChange
                  .bind(this)}/>
                <span style={{
                  color: 'red'
                }}>{this.state.fieldErrors.district}</span>
              </li>
              <li>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={this.state.fields.city}
                  onChange={this
                  .onInputChange
                  .bind(this)}/>
                <span style={{
                  color: 'red'
                }}>{this.state.fieldErrors.city}</span>
              </li>
              <li>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={this.state.fields.country}
                  onChange={this
                  .onInputChange
                  .bind(this)}/>
                <span style={{
                  color: 'red'
                }}>{this.state.fieldErrors.country}</span>
              </li>
              <li>
                <input
                  type="button"
                  value="Pick up current location"
                  onClick={this
                  .pickUpCurrentLocation
                  .bind(this)}/><input type="button" value="Pick up on map" className="cancel"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
                <input
                  type="button"
                  value="Cancel"
                  className="cancel"
                  onClick={this.props.goBack}/>
              </li>
            </ul>
          </form>
        </div>
        <div className="map-section">
          <div id="map">
            <MyMapComponent isMarkerShown={false}></MyMapComponent>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = AddressForm;