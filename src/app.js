import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data';
import {store} from './app-store';

require('jsPlumb');
console.log('asdasd', jsPlumb);

class DAG extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe( () => {
      this.setState(store.getState());
    });
    jsPlumb.ready(function() {
      console.log('Finally jsplumb is ready');
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
          name: 'Something'
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
              <div className="dag-container">
                {
                  this.state.nodes.map(function(node) {
                    return <div className="dag-node"> {node.name}</div>;
                  })
                }
              </div>
            </div>
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
