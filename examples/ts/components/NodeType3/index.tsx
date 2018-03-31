import * as React from "react";

import { endPointStyles, nodeWrapperStyles } from "../NodeType1";

import {DefaultNode} from "react-dag";
import { css } from "glamor";
import { getSettings } from "../../settings/dag-settings";
import { theme } from "../../styles";

const nodeStyles = css({
  background: "white",
  border: `2px solid ${theme.main.colors.yellow}`,
  cursor: "pointer",
  height: "105px",
  left: "200px",
  position: "absolute",
  top: "200px",
  width: "105px",
});

const modEndPointStyles = css({
  "&.bottom": {
    height: "15px",
    left: "45px",
    top: "100px",
  },
  "&.right": {
    height: "15px",
    left: "95px",
    top: "35px",
  },
});

export default class NodeType3 extends DefaultNode {
  private rightEndpointRef: HTMLElement | null;
  private bottomEndpointRef: HTMLElement | null;

  public componentDidMount() {
    const {
      conditionBottomEndpoint,
      conditionRightEndpoint,
    } = getSettings() as any;
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...conditionRightEndpoint,
            isSource: true,
            uuid: `${this.props.id}-condition-right`,
          },
          referenceParams: {},
        },
        {
          element: this.bottomEndpointRef,
          params: {
            ...conditionBottomEndpoint,
            uuid: `${this.props.id}-condition-bottom`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        anchor: "ContinuousLeft",
        dropOptions: { hoverClass: "drag-hover" },
        isTarget: true,
      },
      nodeId: this.props.id,
    };
    if (this.props.initNode) {
      this.props.initNode(initConfig);
    }
  }

  public render() {
    const config = this.props.config;
    let style = {};
    if (config) {
      style = config.style;
    }
    return (
      <div
        id={this.props.id}
        className={`${nodeStyles}`}
        style={style}
      >
        <div className={`${nodeWrapperStyles}`}>
          {config && config.label ? config.label : this.props.id}
          <div
            id={`${this.props.id}-right`}
            ref={ref => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} right`}
          />
          <div
            id={`${this.props.id}-bottom`}
            ref={ref => (this.bottomEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} bottom`}
          />
        </div>
      </div>
    );
  }
}
