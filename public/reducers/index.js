const {combineReducers} = require('redux');
const {reducer: addresses} = require('./addresses');

module.exports = combineReducers({addresses});
