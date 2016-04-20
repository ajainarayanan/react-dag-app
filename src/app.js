import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data';
require('bootstrap/dist/css/bootstrap.min.css');

class DAG extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h2> Come On! </h2>
    );
  }
}

ReactDOM.render(
  <DAG></DAG>,
  document.getElementById('app-dag')
);
