"use client"

import { Coordinate } from "@/interfaces";
import { memo, useEffect, useState, CSSProperties } from "react";

interface IProps {
  size: number;
  routeLine: Coordinate[]
}

interface Line {
  from: Coordinate;
  to: Coordinate;
  style: CSSProperties;
  direction: "horizontal" | "vertical";
  type: "down" | "up"
}

const LineStyle = {
  "border": "2px solid #000"
}

const RouteLayer = (props: IProps) => {
  const { size, routeLine } = props;
  const [lines, setLines] = useState<Line[]>([])

  useEffect(() => {
    const temp: Line[] = [];
      for (let i = 0; i < routeLine.length - 1; i++) {
        let position: Coordinate = [0, 0];
        let direction: "horizontal" | "vertical" = "horizontal";
        let type: "down" | "up" = "down";
        if (routeLine[i][0] === routeLine[i + 1][0]) {
          if (routeLine[i][1] < routeLine[i + 1][1]) {
            position = routeLine[i];
            type = "down";
          } else {
            position = routeLine[i + 1]
            type = "up";
          };
          direction = "horizontal";
        } else if (routeLine[i][1] === routeLine[i + 1][1]) {
          if (routeLine[i][0] < routeLine[i + 1][0]) {
            position = routeLine[i]
            type = "down";
          } else {
            position = routeLine[i + 1]
            type = "up";
          };
          direction = "vertical";
        }
        const thick = "0px"
        temp.push({
          from: routeLine[i],
          to: routeLine[i + 1],
          direction,
          type,
          style: {
            position: "absolute",
            top: `calc(100%/${size - 1}*${position[0]})`,
            left: `calc(100%/${size - 1}*${position[1]})`,
            boxSizing: "border-box",
            height: direction === "horizontal" ? thick : `calc(100%/${size - 1} + ${thick}/2)`,
            width: direction === "horizontal" ? `calc(100%/${size - 1} + ${thick}/2)` : thick,
          }
        });
    }
    setLines(temp);
  }, [routeLine])

  return (
    <div
      className="layer route-layer"
      style={{
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        zIndex: "40"
      }}
    >
      { lines.map(line => {
          const lineColor = "green";
          return (
            <div
              className="route-line"
              style={line.style}
              key={`${line.from}-${line.to}`}
            >
              <div className="line-wrapper" style={{ width: "100%", height: "100%", position: "relative" }}>
                <div
                  className="side-a"
                  style={{ 
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: line.direction === "horizontal"
                      ? `repeating-linear-gradient(${line.type === "up" ? "45deg" : "-45deg"}, ${lineColor}, ${lineColor} 6px, white 0px, white 9px)`
                      : `repeating-linear-gradient(${line.type === "up" ? "45deg" : "-225deg"}, ${lineColor}, ${lineColor} 6px, white 0px, white 9px)`,
                    width: line.direction === "horizontal" ? "100%" : "3px",
                    height: line.direction === "horizontal" ? "3px" : "100%",
                    borderRight: line.direction === "vertical" ? LineStyle["border"] : undefined,
                    borderBottom: line.direction === "horizontal" ? LineStyle["border"] : undefined,
                  }} 
                />
                <div className="side-b"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    background: line.direction === "horizontal"
                      ? `repeating-linear-gradient(${line.type === "up" ? "-225deg" : "45deg"}, ${lineColor}, ${lineColor} 6px, white 0px, white 9px)`
                      : `repeating-linear-gradient(${line.type === "up" ? "-45deg" : "225deg"}, ${lineColor}, ${lineColor} 6px, white 0px, white 9px)`,
                    width: line.direction === "horizontal" ? "100%" : "3px",
                    height: line.direction === "horizontal" ? "3px" : "100%",
                    borderTop: line.direction === "horizontal" ? LineStyle["border"] : undefined,
                    borderLeft: line.direction === "vertical" ? LineStyle["border"] : undefined,
                  }}
                />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default memo(RouteLayer);
