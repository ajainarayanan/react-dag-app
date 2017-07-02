/*
  @flow
*/
import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import {graphLayout, graph} from '../../reducers/layout-reducer';
import undoredoEnhancer  from 'redux-undoredo';

export default function SimpleDAG() {
  let reducers = {
    nodes: [graphLayout],
    connections: [],
    graph: [graph]
  };
  let actionControls = [
    {
      actions: [
        {
          name: 'FIT-TO-SCREEN',
          payload: {
            parentSelector: `.custom-dag .react-dag .diagram-container`
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
  ];
  return (
    <CustomDAG
      actions={actionControls}
      middlewares={[loggerMiddleware]}
      enhancers={[undoredoEnhancer]}
      additionalReducersMap={reducers}
    />
  );
}