var dagre = require('dagre');

var getLayout = (separation = 10, {nodes, connections}) => {
  var rankSeparation = separation;
  var graph = new dagre.graphlib.Graph();
  graph.setGraph({
    nodesep: 10,
    ranksep: 100,
    rankdir: 'LR',
    marginx: 0,
    marginy: 0
  });
  graph.setDefaultEdgeLabel(function() { return {}; });

  nodes.forEach(function (node) {
    var id = node.id || node.name;
    graph.setNode(id, { label: node.label, width: 105, height: 66 });
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
      let layout = getLayout(100, action.payload);
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

export function graph(state = { scale: 1, translate: {}}, action = {}) {
  switch(action.type) {
    case 'FIT-TO-SCREEN':
      let {nodes, connections, parentDimension} = action.payload;
      let layout = getLayout(100, {nodes, connections});
      let {width, height} = parentDimension;
      let widthScale = (width - 100) / layout.graph().width;
      let heightScale = (height - 100) / layout.graph().height;
      let scale = Math.min(widthScale, heightScale);
      let scaledDownGraphWidth = layout.graph().width * scale;
      let scaledDownGraphHeight = layout.graph().height * scale;

      let translateX = ((width - 100) > scaledDownGraphWidth ? ((width - 100) - scaledDownGraphWidth) / 2 : 0);
      let translateY = ((height - 100) > scaledDownGraphHeight ? ((height - 100) - scaledDownGraphHeight) / 2 : 0);
      return Object.assign({}, state, {
        scale: scale > 1 ? 1 : scale,
        translate: `${translateX}px , ${translateY.toString()}px`
      });
    default:
      return state;
  }
};
