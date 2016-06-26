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
    this.enhancers = props.enhancers;
    this.actions = props.actions || [];
    this.additionalReducersMap = props.additionalReducersMap;
    this.data = props.data;
    this.MyTabId = uuid.v4();
  }
  dispatchAction(action) {
    var matchedAction = this.actions
      .find( acn => acn.id === action.id);
    if (typeof matchedAction === 'object') {
      matchedAction.actions.forEach((acn) => {
        let payload = {};
        if (typeof acn.payload === 'function') {
          payload = Object.assign({}, this.myDag.store.getState(), acn.payload() || {});
        } else {
          payload = Object.assign({}, this.myDag.store.getState(), acn.payload || {});
        }
        this.myDag.store.dispatch({
          type: acn.name ,
          payload
        });
      });
      setTimeout(this.myDag.instance.repaintEverything);
    }
  }
  componentDidMount() {
    this.myDag = ReactDOM.render(
      <DAG settings={this.settings}
           data={this.data}
           additionalReducersMap={this.additionalReducersMap}
           enhancers = {this.enhancers}
           middlewares={this.middlewares}>
        <div className="action-controls">
          {
            this.actions.map( acn => {
              return (
                <div className="btn btn-group btn-group-sm">
                  <div className="btn btn-default" onClick={this.dispatchAction.bind(this, acn)}>
                    <i className={acn.className}></i>
                  </div>
                </div>
              );
            })
          }
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
