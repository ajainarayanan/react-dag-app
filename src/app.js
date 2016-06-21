import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexLink } from 'react-router';

import BareDAG  from './features/BareDAG/BareDAG';
import SimpleDAG from './features/SimpleDAG/SimpleDAG';
import ComplexDAG from './features/ComplexDAG/ComplexDAG';
import activeComponent from 'react-router-active-component'
var NavLink = activeComponent('li');

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
                <IndexLink to="/"
                className="btn btn-default"
                activeClassName="active">
                  Bare Minimum Tab
                </IndexLink>
                <Link to="simpledag"
                className="btn btn-default"
                activeClassName="active">
                  Simple Tab
                </Link>
                <Link to="complexdag"
                className="btn btn-default"
                activeClassName="active">
                  Complex Pre-rendered Tab
                </Link>
              </ul>
            </div>
            <div className="col-xs-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </My-App>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute path="baredag" component={BareDAG}/>
      <Route path="simpledag" component={SimpleDAG}/>
      <Route path="complexdag" component={ComplexDAG}/>
    </Route>
  </Router>,
  document.getElementById('app-dag')
);
