import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DAG} from 'react-dag';
import uuid from 'node-uuid';
require('./custom-dag.less');


let nodes = {
  source: 0,
  sink: 0,
  transform: 0
};

export class CustomDAG extends Component {
  constructor(props) {
    super(props);
    this.settings = props.settings;
    this.middlewares = props.middlewares;
    this.additionalReducersMap = props.additionalReducersMap;
    this.data = props.data;
    this.MyTabId = uuid.v4();
  }
  cleanUpGraph() {
    this.myDag.cleanUpGraph();
  }
  componentDidMount() {
    this.myDag = ReactDOM.render(
      <DAG settings={this.settings}
           data={this.data}
           additionalReducersMap={this.additionalReducersMap}
           middlewares={this.middlewares}>
        <div className="action-controls">
          <div className="btn btn-group btn-group-sm">
            {/* To be implemented */}
            {/*<div className="btn btn-default">
              <i className="fa fa-plus"></i>
            </div>
            <div className="btn btn-default">
              <i className="fa fa-minus"></i>
            </div>*/}
            <div className="btn btn-default" onClick={this.cleanUpGraph.bind(this)}>
              <i className="fa fa-expand"></i>
            </div>
          </div>
        </div>
      </DAG>,
      document.getElementById(this.MyTabId)
    );
  }
  addNode(type) {
    let node = {
      type,
      label: `${type}-${++nodes[type]}`
    };
    this.myDag.addNode(node);
  }
  render() {
    return (
      <Custom-DAG>
        <div className="row">
          <div className="col-xs-2">
            <div className="btn-group-vertical btn-block">
              <div className="btn btn-default" onClick={this.addNode.bind(this, 'source')}> Add Source </div>
              <div className="btn btn-default" onClick={this.addNode.bind(this, 'transform')}> Add Transform </div>
              <div className="btn btn-default" onClick={this.addNode.bind(this, 'sink')}> Add Sink </div>
            </div>
          </div>
          <div className="col-xs-10">
            <div id={this.MyTabId}></div>
          </div>
        </div>
      </Custom-DAG>
    )
  }
}
