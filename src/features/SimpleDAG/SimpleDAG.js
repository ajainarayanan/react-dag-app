import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from '../../reducers/layout-reducer';
import undoredoEnhancer  from 'redux-undoredo';

export default class SimpleDAG extends Component {
  constructor(props) {
    let ignoreActions = ['LOADING'];
    super(props);
    this.state = {
      middlewares: [
        loggerMiddleware
      ],
      enhancers: [undoredoEnhancer],
      reducers: {
        nodes: [graphLayout],
        connections: [],
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
        },
        {
          id: 'UNDO',
          actions: [{ name: 'UNDO' }],
          className: 'fa fa-undo'
        },
        {
          id: 'REDO',
          actions: [{ name: 'REDO' }],
          className: 'fa fa-repeat'
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
        enhancers={this.state.enhancers}
        additionalReducersMap={this.state.reducers}/>
    );
  }
}
