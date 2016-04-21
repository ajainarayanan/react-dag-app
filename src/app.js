import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data';
import {store} from './app-store';

require('bootstrap/dist/css/bootstrap.min.css');

class DAG extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe( () => {
      this.setState(store.getState());
    });
  }
  componentDidMount() {
    this.setState(store.getState());
  }
  addNode(type) {
    store.dispatch({
      type: 'ADD-NODE',
      node: {
        type: type
      }
    });
  }
  render() {
    return (
      <div>
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
              <pre>State: {JSON.stringify(this.state, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
let nodes = data.nodes;
let connections = data.connections;

ReactDOM.render(
  <DAG nodes={nodes} connections={connections}></DAG>,
  document.getElementById('app-dag')
);
