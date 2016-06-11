import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import {DAG} from './dag/dag';
import {data} from './data/data';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from './reducers/layout-reducer';
var classnames = require('classname');
require('font-awesome-webpack');
require('./app.less');

let reducers = {
  nodes: [graphLayout],
  graph: [graph]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleTab: true,
      complexTab: false
    };
  }
  showComplexTab() {
    console.log('simple change')
    this.setState(Object.assign({}, this.state, {
      simpleTab: false,
      complexTab: true
    }));
  }
  showSimpleTab() {
    console.log('complex change', this);
    this.setState(Object.assign({}, this.state, {
      simpleTab: true,
      complexTab: false
    }));
  }
  render() {
    let simpleClassName = classnames('', {'simple': this.state.simpleTab, 'hidden': !this.state.simpleTab});
    let complexClassName = classnames('', {'complex': this.state.complexTab, 'hidden': !this.state.complexTab});
    return (
      <My-App>
        <h3> An Example of a Generic DAG </h3>
        <br />
        <div className="nav nav-tabs">
          <ul className="btn-group">
            <li className={classnames("btn btn-default", {'active': this.state.simpleTab})} onClick={this.showSimpleTab.bind(this)}> Simple Tab </li>
            <li className={classnames("btn btn-default", {'active': this.state.complexTab})} onClick={this.showComplexTab.bind(this)}>  Complex Tab </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className={simpleClassName}>
            Simple Tab
          </div>
          <div className={complexClassName}>
            {this.state.complexTab ? <DAG data={data} middlewares={[loggerMiddleware]} additionalReducersMap={reducers}/> : null}
          </div>
        </div>
      </My-App>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app-dag')
);
