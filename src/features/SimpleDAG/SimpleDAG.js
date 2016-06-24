import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from '../../reducers/layout-reducer';
import undoRedoReducer  from '../../reducers/undoredo-reducer';

export default class SimpleDAG extends Component {
  constructor(props) {
    let ignoreActions = ['LOADING'];
    super(props);
    this.state = {
      middlewares: [
        loggerMiddleware
      ],
      reducers: {
        nodes: [graphLayout, undoRedoReducer([], ignoreActions)],
        graph: [graph, undoRedoReducer({}, ignoreActions)]
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
        additionalReducersMap={this.state.reducers}/>
    );
  }
}
