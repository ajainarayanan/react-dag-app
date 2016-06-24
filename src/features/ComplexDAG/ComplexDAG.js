import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import { graphLayout, graph } from '../../reducers/layout-reducer';
import { getSettings } from '../../settings/dag-settings';
import { data } from '../../data/data';
import undoRedoReducer  from '../../reducers/undoredo-reducer';

export default class ComplexDAG extends Component {
  constructor(props) {
    let ignoreActions = ['LOADING'];
    super(props);
    this.state = {
      middlewares: [
        loggerMiddleware
      ],
      data,
      settings: getSettings(),
      reducers: {
        nodes: [graphLayout, undoRedoReducer([], ignoreActions)],
        graph: [graph, undoRedoReducer({}, ignoreActions)]
      },
      actionControls: [
        {
          actions: [
            {
              name: 'FIT-TO-SCREEN',
              payload: { parentSelector: `custom-dag my-dag .diagram-container` }
            },
            { name: 'CLEANUP-GRAPH' }
          ],
          id: 'FIT-AND-CLEANUP',
          className: 'fa fa-expand'
        },
        {
           id: 'ZOOM-IN',
           actions: [{ name: 'ZOOM-IN' }],
           className: 'fa fa-plus'
        },
        {
          id: 'ZOOM-OUT',
          actions: [{ name: 'ZOOM-OUT' }],
          className: 'fa fa-minus'
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
    return (
      <CustomDAG
        data={this.state.data}
        settings={this.state.settings}
        actions={this.state.actionControls}
        middlewares={this.state.middlewares}
        additionalReducersMap={this.state.reducers}/>
    );
  }
}
