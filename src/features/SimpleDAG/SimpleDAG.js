import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from '../../reducers/layout-reducer';

export default class SimpleDAG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      middlewares: [
        loggerMiddleware
      ],
      reducers: {
        nodes: [graphLayout],
        graph: [graph]
      },
      actionControls: [
        {
          actions: [
            {
              name: 'FIT-TO-SCREEN',
              payload: {
                parentSelector: `custom-dag my-dag .diagram-container`
              }
            },
            {
              name: 'CLEANUP-GRAPH'
            }
          ],
          id: 'FIT-AND-CLEANUP',
          className: 'fa fa-expand'
        }
      ]
    };
  }
  render() {
    console.log(this.state);
    return (
      <CustomDAG
        actions={this.state.actionControls}
        middlewares={this.state.middlewares}
        additionalReducersMap={this.state.reducers}/>
    );
  }
}
