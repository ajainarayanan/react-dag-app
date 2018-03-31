import { IConnectionParams } from "react-dag";

export function onConnectionEventHandler(connObj) {
  connObj.connection.endpoints.forEach((endpoint) => {
    const uuid = endpoint.getUuid();
    if (!uuid) {
      return;
    }
    if (uuid.indexOf("DottedEndPoint") !== -1) {
      connObj.connection.setType("dotted");
    }
  });
}

function highlightConnection(connection) {
  connection.toggleType("selected");
}

export function onEndPointClick(jsPlumbObject) {
  if (jsPlumbObject.endpoints) {
    highlightConnection(jsPlumbObject);
  }
  if (jsPlumbObject.connections) {
    jsPlumbObject.connections.forEach((conn) => highlightConnection(conn));
  }
}
