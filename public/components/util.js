module.exports = {
  handleAddresses: (addresses) => {
    if (!addresses) 
      return [];
    return Object
      .keys(addresses)
      .map(key => {
        return {
          id: key,
          ...addresses[key]
        }
      })
  },

  parseAddress: (addressComponents) => {
    let address = {};
    addressComponents.forEach(component => {
      if (component.types[0] == 'country' && component.long_name) {
        address.country = component.long_name;
      }
      if (component.types[0] == 'administrative_area_level_1' && component.long_name) {
        address.city = component.long_name;
      }
      if (component.types[0] == 'administrative_area_level_2' && component.long_name) {
        address.district = component.long_name;
      }
      if (component.types[0] == 'administrative_area_level_3' && component.long_name) {
        address.ward = component.long_name;
      }
      if (component.types[0] == 'street_number' && component.long_name) {
        address.street = component.long_name;
      }
      if (component.types[0] == 'route' && component.long_name) {
        address.street += ' ' + component.long_name;
      }
    });

    return address;
  }
};