
export const transformConnectionEncoder = (
  connObj,
  instance,
  matchingNodes
) => {
  const newConnObj = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(
    node => node.id === newConnObj.sourceId
  );
  if (!sourceNode) {
    return connObj;
  }
  if (
    sourceNode.config &&
    ["transform", "sink"].indexOf(sourceNode.config.type) !== -1 &&
    connObj.sourceId.indexOf("right") === -1
  ) {
    newConnObj.sourceId = `${connObj.sourceId}-right`;
  }
  return newConnObj;
};

export const transformConnectionDecoder = (
  connObj,
  instance,
  matchingNodes
) => {
  const newConnObj = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(
    node => connObj.sourceId.indexOf(`${node.id}-`) !== -1
  );
  if (!sourceNode) {
    return connObj;
  }

  if (
    sourceNode.config &&
    ["transform", "sink"].indexOf(sourceNode.config.type) !== -1 &&
    connObj.sourceId.indexOf("right") !== -1
  ) {
    newConnObj.sourceId = `${connObj.sourceId.slice(
      0,
      connObj.sourceId.indexOf("-right")
    )}`;
  }
  return newConnObj;
};

export const conditionConnectionEncoder = (
  connObj,
  instance,
  matchingNodes
) => {
  const newConnObj = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(node => connObj.sourceId === node.id);
  if (!sourceNode) {
    return connObj;
  }

  if (
    sourceNode.config &&
    sourceNode.config.type === "condition" &&
    connObj.sourceId.indexOf("bottom") === -1 &&
    connObj.sourceId.indexOf("right") === -1
  ) {
    if (connObj.data) {
      if (connObj.data.condition === "true") {
        newConnObj.sourceId = `${connObj.sourceId}-right`;
      } else {
        newConnObj.sourceId = `${connObj.sourceId}-bottom`;
      }
    }
  }
  return newConnObj;
};

export const conditionConnectionDecoder = (
  connObj,
  instance,
  matchingNodes
) => {
  const newConnObj = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(
    node => connObj.sourceId.indexOf(`${node.id}-`) !== -1
  );

  if (!sourceNode) {
    return connObj;
  }

  if (
    sourceNode.config &&
    sourceNode.config.type === "condition"
  ) {
    if (connObj.sourceId.indexOf("right") !== -1) {
      newConnObj.sourceId = `${connObj.sourceId.slice(
        0,
        connObj.sourceId.indexOf("-right")
      )}`;
      newConnObj.data = {
        condition: "true",
      };
    }
    if (connObj.sourceId.indexOf("bottom") !== -1) {
      newConnObj.sourceId = `${connObj.sourceId.slice(
        0,
        connObj.sourceId.indexOf("-bottom")
      )}`;
      newConnObj.data = {
        condition: "false",
      };
    }
  }
  return newConnObj;
};
