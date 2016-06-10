import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import {DAG} from './dag/dag';
import {data} from './data/data';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from './reducers/layout-reducer';
let reducers = {
  nodes: [graphLayout],
  graph: [graph]
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <My-App>
        <DAG data={data} middlewares={[loggerMiddleware]} additionalReducersMap={reducers}/>
      </My-App>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app-dag')
);
