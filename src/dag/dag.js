import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from './app-store';
import {getSettings, getIcon} from './dag-settings';


require('./styles/dag.less');
require('jsPlumb');

var dagre = require('dagre');
var classnames = require('classname');

export class DAG extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore(
      props.data,
      props.additionalReducersMap,
      [...props.middlewares]
    );
    if (props.data) {
      setTimeout(this.cleanUpGraph.bind(this));
    }
    this.state = this.store.getState();
    console.log('scale', this.state.graph.scale);
    this.endpoints = [];
    this.settings = getSettings();

    const renderGraph = () => {
      this.addEndpoints();
      this.makeNodesDraggable();
      this.renderConnections();
      this.renderCleanedUpGraph();
    };

    this.store.subscribe( () => {
      this.setState(this.store.getState());
      setTimeout(renderGraph.bind(this));
    });

    jsPlumb.ready(() => {
      let dagSettings = this.settings.default;
      jsPlumb.setContainer('dag-container');
      this.instance = jsPlumb.getInstance(dagSettings);
      this.instance.bind('connection', this.makeConnections.bind(this));
      this.instance.bind('connectionDetached', this.makeConnections.bind(this));

      if (Object.keys(props.data).length) {
        renderGraph.call(this);
      }
    });
  }
  renderCleanedUpGraph() {
    let scale = this.store.getState().graph.scale;
    this.instance.setZoom(scale);
    this.render();
  }
  makeNodesDraggable() {
    let nodes = document.querySelectorAll('#dag-container .box');
    this.instance.draggable(nodes, {
      start: () => { console.log('Starting to drag')},
      stop: (dragEndEvent) => {
        this.store.dispatch({
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
  makeConnections(info, originalEvent) {
    if (!originalEvent) { return; }
    let connections = this.instance
      .getConnections()
      .map(conn => ({
          from: conn.sourceId,
          to: conn.targetId
        })
      );
      this.store.dispatch({
        type: 'SET-CONNECTIONS',
        payload: {
          connections
        }
      });
  }
  renderConnections() {
    let connectionsFromInstance = this.instance
      .getConnections()
      .map( conn => ({
          from: conn.sourceId,
          to: conn.targetId
        })
      );
    let {nodes, connections} = this.store.getState();
    if (connections.length === connectionsFromInstance.length) { return; }
    connections
      .forEach( connection => {
        var sourceNode = nodes.find( node => node.id === connection.from);
        var targetNode = nodes.find( node => node.id === connection.to);
        var sourceId = sourceNode.type === 'transform' ? 'Left' + connection.from : connection.from;
        var targetId = targetNode.type === 'transform' ? 'Right' + connection.to : connection.to;
        var connObj = {
          uuids: [sourceId, targetId],
          detachable: true
        };
        this.instance.connect(connObj);
      });
  }
  addEndpoints() {
    this.store.getState()
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
    this.setState(this.store.getState());
  }
  addNode(type) {
    this.store.dispatch({
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
  cleanUpGraph() {
    let {nodes, connections} = this.store.getState();
    let parent = document.querySelector('.diagram-container');
    let parentDimension = {
      height: parent.getBoundingClientRect().height,
      width: parent.getBoundingClientRect().width
    };

    this.store.dispatch({
      type: 'CLEANUP-GRAPH',
      payload: {nodes, connections}
    });

    this.store.dispatch({
      type: 'FIT-TO-SCREEN',
      payload: {nodes, connections, parentDimension}
    });
    setTimeout(this.instance.repaintEverything.bind(this));
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
                <button className="btn btn-default" onClick={this.cleanUpGraph.bind(this)}>
                Cleanup Graph </button>
              </div>
            </div>
            <div className="col-xs-10">
              <div className="diagram-container">
                <div id="dag-container"
                     style={{transform: 'scale(' + this.state.graph.scale + ')'}}>
                  {
                    this.state.nodes.map(function(node) {
                      return (
                          <div className="box text-center" id={node.id} key={node.id} style={node.style}>
                            <div className={classnames({'dag-node': true, [node.type]: true})}></div>
                              <div className="label">{node.name}</div>
                          </div>
                        );
                    })
                  }
                </div>
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
