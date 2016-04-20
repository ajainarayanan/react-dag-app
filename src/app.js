import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data';
require('bootstrap/dist/css/bootstrap.min.css');

class DAG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      connections: []
    };
  }
  componentDidMount() {
    this.setState({
      nodes: this.props.nodes,
      connections: this.props.connections
    });
  }
  onTextChange(event) {
    this.setState({
      nodes: JSON.parse(event.target.value),
      connections: this.state.connections
    });
  }
  render() {
    return (
      <div>
        <h4> Generic DAG </h4>
        <textarea className="form-control"
                  defaultValue={JSON.stringify(this.state.nodes)}
                  onChange={this.onTextChange.bind(this)}
                  >
        </textarea>
        <div>
          {JSON.stringify(this.state.nodes)}
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
