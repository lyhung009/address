const {handleActions} = require('redux-actions');

const FETCH_ADDRESSES = "addresses/FETCH_ADDRESSES";
const FETCH_ADDRESS = "addresses/FETCH_ADDRESS";
const ADD_ADDRESS = "addresses/ADD_ADDRESS";
const EDIT_ADDRESS = "addresses/EDIT_ADDRES";

const initialState = {
  all: [],
  current: {}
};

module.exports = {
  fetchAddressesActionCreator: (addresses) => ({type: FETCH_ADDRESSES, addresses}),
  fetchAddressActionCreator: ( address) => ({type: FETCH_ADDRESS, address}),
  reducer: handleActions({
    [FETCH_ADDRESSES]: (state, action) => ({
      current: state.current,
      all: action.addresses
    }),
    [FETCH_ADDRESS]: (state, action) => ({
      all: state.all,
      current: action.address
    })
  }, initialState)
}