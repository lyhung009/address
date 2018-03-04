const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {createStore} = require('redux');
const {BrowserRouter, Route, Switch} = require('react-router-dom');
const App = require('./components/app');
const AddAddress = require('./components/add_address');
const EditAddress = require('./components/edit_address');
const reducers = require('./reducers');
const firebase = require('firebase');
const config = require('./firebase.config');
const {withRouter} = require('react-router-dom');

const db = firebase.initializeApp(config);

ReactDOM.render((
  <Provider store={createStore(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <App db={db}></App>}/>
        <Route path='/add' component={() => <AddAddress db={db}></AddAddress>}/>
        <Route path={'/edit/:id'} component={() => <EditAddress db={db}></EditAddress>}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));