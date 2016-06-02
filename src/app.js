import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data';
import {store} from './app-store';
import {getSettings, getIcon, getGraphLayout} from './dag-settings';
require('jsPlumb');
var classnames = require('classname');

class DAG extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.endpoints = [];
    this.settings = getSettings();
    store.subscribe( () => {
      this.setState(store.getState());
      setTimeout(() => {
        this.addEndpoints();
        this.makeNodesDraggable();
      });
    });
    jsPlumb.ready(() => {
      let dagSettings = this.settings.default;
      jsPlumb.setContainer('dag-container');
      this.instance = jsPlumb.getInstance(dagSettings);
      this.instance.bind('connection', this.makeConnections.bind(this));
      this.instance.bind('connectionDetached', this.makeConnections.bind(this));

      this.addEndpoints();
      this.makeNodesDraggable();
      this.makeConnections();
    });
  }
  makeNodesDraggable() {
    let nodes = document.querySelectorAll('#dag-container .box');
    this.instance.draggable(nodes, {
      start: () => { console.log('Starting to drag')},
      stop: (dragEndEvent) => {
        store.dispatch({
          type: 'UPDATE_NODE',
          payload: {
            nodeId: dragEndEvent.el.id,
            style: {
              top: dragEndEvent.el.style.top,
              left: dragEndEvent.el.style.left
            }
          }
        });
        this.instance.repaintEverything();
      }
    });
  }
  makeConnections() {
    let connections = this.instance
      .getConnections()
      .map(conn => {
        return {
          from: conn.sourceId,
          to: conn.targetId
        };
      });
      store.dispatch({
        type: 'SET-CONNECTIONS',
        payload: {
          connections
        }
      });
  }
  addEndpoints() {
    store.getState()
      .nodes
      .forEach(node => {
        if (this.endpoints.indexOf(node.id) !== -1) {
          return;
        }
        this.endpoints.push(node.id);
        let type = node.type;
        switch(type) {
          case 'source':
            this.instance.addEndpoint(node.id, this.settings.source, {uuid: node.id});
            return;
          case 'sink':
            this.instance.addEndpoint(node.id, this.settings.sink, {uuid: node.id});
            return;
          default:
            this.instance.addEndpoint(node.id, this.settings.transformSource, {uuid: `Left${node.id}`});
            this.instance.addEndpoint(node.id, this.settings.transformSink, {uuid: `Right${node.id}`});
        }
      });
  }
  componentDidMount() {
    this.setState(store.getState());
  }
  addNode(type) {
    store.dispatch({
      type: 'ADD-NODE',
      node: {
        type: type,
        data: {
          type: type,
          name: type + Date.now().toString().slice(8)
        }
      }
    });
  }
  render() {
    return (
      <my-dag>
        <h4> Generic DAG </h4>
        <div className="container">
          <div className="row">
            <div className="col-xs-2">
              <div className="btn-group-vertical btn-block">
                <button className="btn btn-default" onClick={this.addNode.bind(this, 'source')}> Add Source </button>
                <button className="btn btn-default" onClick={this.addNode.bind(this, 'transform')}> Add Transform </button>
                <button className="btn btn-default" onClick={this.addNode.bind(this, 'sink')}> Add Sink </button>
              </div>
            </div>
            <div className="col-xs-10">
              <div id="dag-container">
                {
                  this.state.nodes.map(function(node) {
                    return (
                        <div className="box text-center" id={node.id} key={node.id}>
                          <div className={classnames({'dag-node': true, [node.type]: true})}
                              style={node.style}></div>
                            <div className="label">{node.name}</div>
                        </div>
                      );
                  })
                }
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
            <pre>
              {JSON.stringify(this.state.nodes, null, 4)}
            </pre>
            <pre>
              {JSON.stringify(this.state.connections, null, 4)}
            </pre>
          </div>
        </div>
      </my-dag>
    );
  }
}
let nodes = data.nodes;
let connections = data.connections;
ReactDOM.render(
  <DAG my-dag nodes={nodes} connections={connections}/>,
  document.getElementById('app-dag')
);
