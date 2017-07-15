import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Route, Switch, BrowserRouter } from 'react-router-dom';

import BareDAG  from './features/BareDAG/BareDAG';
import SimpleDAG from './features/SimpleDAG/SimpleDAG';
import ComplexDAG from './features/ComplexDAG/ComplexDAG';

require('font-awesome-webpack');
require('./app.less');

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <My-App>
        <h3> An Example of a Generic DAG </h3>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <ul className="btn-group">
                <NavLink
                  exact
                  to="/"
                  className="btn btn-default"
                  activeClassName="active"
                >
                  Bare Minimum Tab
                </NavLink>
                <NavLink
                  to="/simpledag"
                  className="btn btn-default"
                  activeClassName="active"
                >
                  Simple Tab
                </NavLink>
                <NavLink 
                  to="/complexdag"
                  className="btn btn-default"
                  activeClassName="active"
                >
                  Complex Pre-rendered Tab
                </NavLink>
              </ul>
            </div>
            <div className="col-xs-12">
              <Route exact path="/" component={BareDAG} />
              <Route exact path="/baredag" component={BareDAG}/>
              <Route exact path="/simpledag" component={SimpleDAG}/>
              <Route exact path="/complexdag" component={ComplexDAG}/>
            </div>
          </div>
        </div>
      </My-App>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app-dag')
);
