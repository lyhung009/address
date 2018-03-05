const React = require('react');
const {createClient} = require('@google/maps');
const key = require('../googlemaps.config');
const {parseAddress} = require('./util');
const {compose, withProps} = require('recompose');
const {withScriptjs, withGoogleMap, GoogleMap, Marker} = require('react-google-maps');
const _ = require('lodash');
require('./address_form.scss');

class AddressForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fields: {
        street: '',
        ward: '',
        district: '',
        city: '',
        country: ''
      },
      markerLatLong: [10.762622, 106.660172],
      fieldErrors: {}
    };

    this.googleMapsClient = createClient({key: key});
  }

  componentWillReceiveProps (nextProps) {
    const {
      address = {
        street: '',
        ward: '',
        district: '',
        city: '',
        country: ''
      }
    } = nextProps;
    this.handleAddressChange(address);
  }

  componentWillMount() {
    this.delayedOnInputChange = _.throttle((evt) => {
      let errors = this.validate(this.state.fields);
      if (Object.keys(errors).length === 0) {
        this.handleAddressChange(this.state.fields);
      }
    }, 1000);
  }

  handleAddressChange (address, onPropsChange = true) {
    let fields = {
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
      country: address.country
    };

    if (onPropsChange) {
      this.googleMapsClient.geocode({
        address: [address.street, address.ward, address.district, address.city, address.country]
                .filter(item => !!item).join(', ')
      }, (err, response) => {
        if (!err) {
          if (response.json.results.length > 0) {
            let location = response.json.results[0].geometry.location;
            let markerLatLong = [location.lat, location.lng];
            this.setState({markerLatLong: markerLatLong});
          }
        }
      })
    }
    this.setState({fields: fields});
  }

  handleMapClick (evt) {
    let latitude = evt
      .latLng
      .lat();
    let longitude = evt
      .latLng
      .lng();
    let markerLatLong = [latitude, longitude];
    this.setState({markerLatLong: markerLatLong});
    this.getLocationInformation(latitude, longitude);
  }

  onInputChange (evt) {
    evt.persist();
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields});

    this.delayedOnInputChange(evt);
  }

  getLocationInformation (lat, lng) {
    this
      .googleMapsClient
      .reverseGeocode({
        latlng: [lat, lng]
      }, (err, response) => {
        if (!err) {
          this.handleAddressChange(parseAddress(response.json.results[0].address_components), false);
        }
      });
  }

  pickUpCurrentLocation () {
    if (navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition(position => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          let markerLatLong = [latitude, longitude];
          this.setState({markerLatLong: markerLatLong});

          this.getLocationInformation(latitude, longitude);
        });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  validate (address) {
    const errors = {};
    if (!address.street) {
      errors.street = 'Street name is required';
    }
    if (!address.city || address.city.trim() === '') {
      if (!address.ward) {
        errors.ward = 'Ward is required';
      }
      if (!address.district) {
        errors.district = 'District is required';
      }
    }
    return errors;
  }

  onFormSubmit (evt) {
    const address = this.state.fields;
    const fieldErrors = this.validate(address);
    this.setState({fieldErrors});

    evt.preventDefault();

    if (Object.keys(fieldErrors).length) {
      return;
    }
    
    this
      .props
      .onSubmit(address);
  }

  render () {
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
                  .bind(this)}/> or pick up a location on Map<br/>
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
            <MyMapComponent isMarkerShown={true}
              onMapClick={this
              .handleMapClick
              .bind(this)} markerLatLong={this.state.markerLatLong}></MyMapComponent>
          </div>
        </div>
      </div>
    )
  }
}

const MyMapComponent = compose(withProps({
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}
      &v=3.exp&libraries=geometry,drawing,places`, 
  loadingElement: <div style={{
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
    onClick={props.onMapClick}
    defaultZoom={15}
    center={{
    lat: props.markerLatLong[0],
    lng: props.markerLatLong[1]
  }}>
  {props.isMarkerShown && <Marker position={{ lat: props.markerLatLong[0], lng: props.markerLatLong[1] }} />}
  </GoogleMap>
));

module.exports = AddressForm;
