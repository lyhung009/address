import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import AddressForm from './components/address_form.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/add" component={AddressForm}/>
      <Route path="/edit" component={AddressForm}/>
    </Switch>
  </Router>
), document.getElementById('root'))