import _ from 'lodash';
var extend = _.extend;
var clone = _.clone;
// import clone from 'lodash';


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
    [ 'Arrow', { location: 1, length: 12, width: 12, height: 10, foldback: 1 } ]
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
var sourceSettings = extend({
  isSource: true,
  connectorStyle: connectorStyle,
  anchor: [ 0.5, 1, 1, 0, 26, -43, 'sourceAnchor']
}, commonSettings);
var sinkSettings = extend({
  isTarget: true,
  anchor: [ 0.5, 1, -1, 0, -26, -43, 'sinkAnchor'],
  connectorStyle: connectorStyle
}, commonSettings);

export function getSettings(isDisabled) {
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

  settings.transformSource = clone(settings.source);
  settings.transformSink = clone(settings.sink);
  settings.transformSource.anchor = [ 0.5, 1, 1, 0, 26, -43, 'transformAnchor'];
  settings.transformSink.anchor = [ 0.5, 1, -1, 0, -26, -43, 'transformAnchor'];

  return settings;
}
