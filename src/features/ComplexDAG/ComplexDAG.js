/*
  @flow
*/
import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();
import { graphLayout, graph } from '../../reducers/layout-reducer';
import { getSettings } from '../../settings/dag-settings';
import { data } from '../../data/data';
import undoredoEnhancer  from 'redux-undoredo';

export default function ComplexDAG () {
  let ignoreActions = ['LOADING'];
  let middlewares = [
    loggerMiddleware
  ];
  let enhancers = [undoredoEnhancer];
  let settings = getSettings();
  let reducers = {
    nodes: [graphLayout],
    graph: [graph]
  };
  let actionControls = [
    {
      actions: [
        {
          name: 'FIT-TO-SCREEN',
          payload: { parentSelector: `.custom-dag .react-dag .diagram-container` }
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
  ];
  return (
    <CustomDAG
      data={data}
      settings={settings}
      enhancers={enhancers}
      actions={actionControls}
      middlewares={middlewares}
      additionalReducersMap={reducers}/>
  );
}