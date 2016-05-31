import _ from 'lodash';
var extend = _.extend;
var clone = _.clone;
// import clone from 'lodash';

export function settings() {
  var defaultSettings = {
  Connector : [ 'Flowchart', {gap: 6, stub: [10, 15], alwaysRespectStubs: true} ],
  ConnectionsDetachable: true
};
  var connectorStyle = {
    strokeStyle: '#666e82',
    fillStyle: '#666e82',
    radius: 5,
    lineWidth: 2
  };
  var connectorOverlays = {
    connectorOverlays: [
      [ 'Arrow', { location: 1, length: 12, width: 12, height: 10, foldback: 1 } ],
      [ 'Custom', {
        location: 0.5,
        id: 'label'
      }]
    ]
  };
  var disabledConnectorOverlays = {
    connectorOverlays: [
      [ 'Arrow', { location: 1, length: 12, width: 12, height: 10, foldback: 1 } ]
    ]
  };

  var commonSettings = {
    endpoint:'Dot',
    maxConnections: -1, // -1 means unlimited connections
    paintStyle: {
      strokeStyle: '#666e82',
      fillStyle: '#666e82',
      radius: 5,
      lineWidth: 3
    },
    anchors: [ 'Static']
  };
  var sourceSettings = _.extend({
    isSource: true,
    connectorStyle: connectorStyle,
    anchor: [ 0.5, 1, 1, 0, 26, -43, 'sourceAnchor']
  }, commonSettings);
  var sinkSettings = extend({
    isTarget: true,
    anchor: [ 0.5, 1, -1, 0, -26, -43, 'sinkAnchor'],
    connectorStyle: connectorStyle
  }, commonSettings);

  function getSettings(isDisabled) {
    var settings = {};
    if (isDisabled) {
      settings = {
        default: defaultSettings,
        commonSettings: extend(commonSettings, disabledConnectorOverlays),
        source: extend(sourceSettings, disabledConnectorOverlays),
        sink: extend(sinkSettings, disabledConnectorOverlays)
      };
    } else {
      settings = {
        default: defaultSettings,
        commonSettings: extend(commonSettings, connectorOverlays),
        source: extend(sourceSettings, connectorOverlays),
        sink: extend(sinkSettings, connectorOverlays)
      };
    }

    settings.transformSource = copy(settings.source);
    settings.transformSink = copy(settings.sink);
    settings.transformSource.anchor = [ 0.5, 1, 1, 0, 26, -43, 'transformAnchor'];
    settings.transformSink.anchor = [ 0.5, 1, -1, 0, -26, -43, 'transformAnchor'];

    return settings;
  }

  function getIcon(plugin) {
    var iconMap = {
      'script': 'icon-script',
      'scriptfilter': 'icon-scriptfilter',
      'twitter': 'icon-twitter',
      'cube': 'icon-cube',
      'data': 'fa-database',
      'database': 'icon-database',
      'table': 'icon-table',
      'kafka': 'icon-kafka',
      'stream': 'icon-streams',
      'jms': 'icon-jms',
      'projection': 'icon-projection',
      'amazonsqs': 'icon-amazonsqs',
      'datagenerator': 'icon-datagenerator',
      'validator': 'icon-validator',
      'corevalidator': 'corevalidator',
      'logparser': 'icon-logparser',
      'file': 'icon-file',
      'kvtable': 'icon-kvtable',
      's3': 'icon-s3',
      's3avro': 'icon-s3avro',
      's3parquet': 'icon-s3parquet',
      'snapshotavro': 'icon-snapshotavro',
      'snapshotparquet': 'icon-snapshotparquet',
      'tpfsavro': 'icon-tpfsavro',
      'tpfsparquet': 'icon-tpfsparquet',
      'sink': 'icon-sink',
      'hive': 'icon-hive',
      'structuredrecordtogenericrecord': 'icon-structuredrecord',
      'cassandra': 'icon-cassandra',
      'teradata': 'icon-teradata',
      'elasticsearch': 'icon-elasticsearch',
      'hbase': 'icon-hbase',
      'mongodb': 'icon-mongodb',
      'pythonevaluator': 'icon-pythonevaluator',
      'csvformatter': 'icon-csvformatter',
      'csvparser': 'icon-csvparser',
      'clonerecord': 'icon-clonerecord',
      'compressor': 'icon-compressor',
      'decompressor': 'icon-decompressor',
      'encoder': 'icon-encoder',
      'decoder': 'icon-decoder',
      'jsonformatter': 'icon-jsonformatter',
      'jsonparser': 'icon-jsonparser',
      'streamformatter': 'icon-streamformatter',
      'hdfs': 'icon-hdfs',
      'hasher': 'icon-hasher',
      'javascript': 'icon-javascript',
      'deduper': 'icon-deduper',
      'distinct': 'icon-distinct',
      'naivebayestrainer': 'icon-naivebayestrainer',
      'groupbyaggregate': 'icon-groupbyaggregate',
      'naivebayesclassifier': 'icon-naivebayesclassifier'

    };

    var pluginName = plugin.toLowerCase();
    var icon = iconMap[pluginName] ? iconMap[pluginName]: 'fa-plug';
    return icon;
  }

  function getGraphLayout(nodes, connections, separation) {
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
  }

  return {
    getSettings: getSettings,
    getIcon: getIcon,
    getGraphLayout: getGraphLayout
  };

};
