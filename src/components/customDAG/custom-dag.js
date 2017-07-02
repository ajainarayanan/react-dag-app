/*
@flow
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DAG, {configureStore, STOREACTIONS} from 'react-dag';
import uuid from 'node-uuid';
import classnames from 'classnames';
require('./custom-dag.less');


let nodes = {
  source: 0,
  sink: 0,
  transform: 0
};

type propType = {
  data: Object,
  additionalReducersMap: Object,
  enhancers: Array<Object>,
  middlewares: Array<Object>,
  settings: Object,
  store: Object,
  actions: Array<Object>
};
type StoreAction = {
  name: string,
  payload: Object
};

type Action = {
  id: string,
  actions: Array<StoreAction>
};

export class CustomDAG extends Component {
  static defaultProps = {
    middlewares: [],
    enhancers: [],
    actions: [],
    additionalReducersMap: {}
  };
  settings: Object;
  middlewares: Array<Object>;
  enhancers: Array<Object>;
  actions: Array<Object>;
  additionalReducersMap: Object;
  data: Object;
  dagStore: Object;
  constructor(props: propType) {
    super(props);
    this.settings = props.settings;
    this.middlewares = props.middlewares;
    this.enhancers = props.enhancers;
    this.actions = props.actions;
    this.additionalReducersMap = props.additionalReducersMap;
    this.data = props.data;
    this.dagStore = configureStore(
      this.data,
      this.additionalReducersMap,
      [...this.middlewares],
      [...this.enhancers]
    );
  }
  dispatchAction(action: Action) {
    var matchedAction = this.actions
      .find( acn => acn.id === action.id);
    if (typeof matchedAction === 'object') {
      matchedAction.actions.forEach((acn) => {
        let payload = {};
        if (typeof acn.payload === 'function') {
          payload = Object.assign({}, this.dagStore.getState(), acn.payload() || {});
        } else {
          payload = Object.assign({}, this.dagStore.getState(), acn.payload || {});
        }
        this.dagStore.dispatch({
          type: acn.name ,
          payload
        });
      });
    }
  }
  addNode(type: string) {
    let label = `${type}-${++nodes[type]}`;
    this.dagStore.dispatch({
      type: STOREACTIONS.ADDNODE,
      payload: {
        type,
        label,
        id: type + uuid.v4()
      }
    });
  }
  removeNode (node: Object, jsPlumbInstance: Object, e: Object) {
    this.dagStore.dispatch({
      type: STOREACTIONS.REMOVENODE,
      payload: {
        nodeId: node.id
      }
    });
    e.preventDefault();
    e.preventPropagation ? e.preventPropagation() : null;
    return false;
  }
  render() {
    return (
      <div className="custom-dag">
        <div className="row">
          <div className="col-xs-2">
            <div className="btn-group-vertical btn-block">
              <div className="btn btn-default" onClick={this.addNode.bind(this, 'source')}> Add Source </div>
              <div className="btn btn-default" onClick={this.addNode.bind(this, 'transform')}> Add Transform </div>
              <div className="btn btn-default" onClick={this.addNode.bind(this, 'sink')}> Add Sink </div>
            </div>
          </div>
          <div className="col-xs-10">
            <DAG settings={this.settings}
              data={this.data}
              additionalReducersMap={this.additionalReducersMap}
              enhancers = {this.enhancers}
              middlewares={this.middlewares}
              store={this.dagStore}
              onNodesClick={(action, nodeState, e) => console.log('Got it', action, nodeState)}
              renderNode={(jsPlumbInstance, node) => {
                return (
                  <div key={node.id}>
                    <div
                      className="node text-center"
                      id={node.id}
                      style={node.style}
                    >
                      <div className={classnames({'dag-node': true, [node.type]: true})}>
                        <strong
                          className="close-btn"
                          onClick={this.removeNode.bind(null, node, jsPlumbInstance)}
                        >
                          x
                        </strong>
                      </div>
                      <div className="label">{node.label}</div>
                    </div>
                  </div>
                );
              }}
            >
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
            </DAG>
          </div>
        </div>
      </div>
    )
  }
}
