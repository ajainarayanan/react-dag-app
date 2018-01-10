import { IConnectionParams } from "react-dag";

export function onConnectionEventHandler(connObj: IConnectionParams) {
  connObj.connection.endpoints.forEach((endpoint: IConnectionParams) => {
    const uuid: string = endpoint.getUuid();
    if (!uuid) {
      return;
    }
    if (uuid.indexOf("DottedEndPoint") !== -1) {
      connObj.connection.setType("dotted");
    }
  });
}

function highlightConnection(connection: IConnectionParams) {
  connection.toggleType("selected");
}

export function onEndPointClick(jsPlumbObject: any) {
  if (jsPlumbObject.endpoints) {
    highlightConnection(jsPlumbObject);
  }
  if (jsPlumbObject.connections) {
    jsPlumbObject.connections.forEach((conn: IConnectionParams) => highlightConnection(conn));
  }
}
