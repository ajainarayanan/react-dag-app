import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import {getSettings} from '../../settings/dag-settings';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();

export default function BareDAG() {
  return (<CustomDAG settings={getSettings()}/>);
}