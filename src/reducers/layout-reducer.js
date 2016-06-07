var dagre = require('dagre');

var getLayout = (separation, {nodes, connections}) => {
  var rankSeparation = separation || 200;

  var graph = new dagre.graphlib.Graph();
  graph.setGraph({
    nodesep: 90,
    ranksep: rankSeparation,
    rankdir: 'LR',
    marginx: 0,
    marginy: 0
  });
  graph.setDefaultEdgeLabel(function() { return {}; });

  nodes.forEach(function (node) {
    var id = node.id || node.name;
    graph.setNode(id, { label: node.label, width: 100, height: 100 });
  });

  connections.forEach(function (connection) {
    graph.setEdge(connection.from, connection.to);
  });

  dagre.layout(graph);
  return graph;
};

export function graphLayout(state = [], action = {}) {

  switch(action.type) {
    case 'CLEANUP-GRAPH':
      let layout = getLayout(200, action.payload);
      return state.map( node => {
        node.style = {
          top: layout._nodes[node.id].y + 'px',
          left: layout._nodes[node.id].x + 'px'
        };
        return node;
      });
    default:
      return state;
  }
}
