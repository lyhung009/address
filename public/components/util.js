module.exports = {
  handleAddresses: (addresses) => {
    if (!addresses) {
      return [];
    }
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
      if (component.types[0] === 'country') {
        address.country = component.long_name;
      }
      if (component.types[0] === 'administrative_area_level_1') {
        address.city = component.long_name;
      }
      if (component.types[0] === 'administrative_area_level_2') {
        address.district = component.long_name;
      }
      if (component.types[0] === 'administrative_area_level_3') {
        address.ward = component.long_name;
      }
      if (component.types[0] === 'street_number') {
        address.street = component.long_name;
      }
      if (component.types[0] === 'route') {
        if (address.street) {
          address.street += ' ' + component.long_name;
        } else { 
          address.street = component.long_name;
        }
      }
      });

    return address;
  },

  prepareCSVData: (addresses) => {
    let addressesWithNoId = addresses.map(address => {
      let address1 = [address.street, address.ward, address.district, address.city, address.country];
      return address1;
    });

    addressesWithNoId.unshift(['Street Name', 'Ward', 'District', 'City', 'Country']);
    return addressesWithNoId;
  }
};
