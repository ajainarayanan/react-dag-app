import React , { Component } from 'react';
import ReactDOM from 'react-dom';

import {data} from './data/data';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from './reducers/layout-reducer';
var classnames = require('classname');
import {getSettings} from './settings/dag-settings';
import {CustomDAG} from './components/customDAG/custom-dag';

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
  componentDidMount() {
    this.showMinTab();
  }
  showComplexTab() {
    ReactDOM.unmountComponentAtNode(document.getElementById('simpleTabContent'));
    ReactDOM.unmountComponentAtNode(document.getElementById('minTabContent'));
    ReactDOM.render(
      <CustomDAG data={data} middlewares={[loggerMiddleware]} additionalReducersMap={reducers}/>,
      document.getElementById('complexTabContent')
    );
    this.setState(Object.assign({}, this.state, {
      minTab: false,
      simpleTab: false,
      complexTab: true
    }));
  }
  showSimpleTab() {
    ReactDOM.unmountComponentAtNode(document.getElementById('minTabContent'));
    ReactDOM.unmountComponentAtNode(document.getElementById('complexTabContent'));
    ReactDOM.render(
      <CustomDAG middlewares={[loggerMiddleware]} additionalReducersMap={reducers}/>,
      document.getElementById('simpleTabContent')
    );
    this.setState(Object.assign({}, this.state, {
      minTab: false,
      simpleTab: true,
      complexTab: false
    }));
  }
  showMinTab() {
    ReactDOM.unmountComponentAtNode(document.getElementById('complexTabContent'));
    ReactDOM.unmountComponentAtNode(document.getElementById('simpleTabContent'));
    ReactDOM.render(<CustomDAG settings={getSettings()}/>, document.getElementById('minTabContent'));
    this.setState(Object.assign({}, this.state, {
      minTab: true,
      simpleTab: false,
      complexTab: false
    }));
  }
  render() {
    const { minTab, simpleTab, complexTab } = this.state;
    const minTabHeader = classnames("btn btn-default", {'active': minTab});
    const simpleTabHeader = classnames("btn btn-default", {'active': simpleTab});
    const complexTabHeader = classnames("btn btn-default", {'active': complexTab});

    const minTabContentClass = classnames({'simple': simpleTab, 'hidden': !minTab});
    const simpleTabContentClass = classnames({'simple': simpleTab, 'hidden': !simpleTab});
    const complexTabContentClass = classnames({'complex': complexTab, 'hidden': !complexTab});
    return (
      <My-App>
        <h3> An Example of a Generic DAG </h3>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <ul className="btn-group ">
                <li className={minTabHeader}
                    onClick={this.showMinTab.bind(this)}>
                    Bare Minimum Tab
                </li>
                <li className={simpleTabHeader}
                    onClick={this.showSimpleTab.bind(this)}>
                    Simple Tab
                </li>
                <li className={complexTabHeader}
                    onClick={this.showComplexTab.bind(this)}>
                    Complex Pre-rendered Tab
                </li>
              </ul>
            </div>
            <div className="col-xs-12">
              <div id="minTabContent"></div>
              <div id="simpleTabContent"></div>
              <div id="complexTabContent"></div>
            </div>
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
