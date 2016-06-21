import React, { Component } from 'react';
import { CustomDAG } from '../../components/customDAG/custom-dag';
import {getSettings} from '../../settings/dag-settings';
import createLogger from 'redux-logger';
let loggerMiddleware = createLogger();

export default class BareDAG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      middlewares: [
        loggerMiddleware
      ],
      actionControls: []
    };
  }
  render() {
    return (
      <CustomDAG settings={getSettings()}/>
    );
  }
}
