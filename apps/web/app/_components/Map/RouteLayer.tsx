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
}

const RouteLayer = (props: IProps) => {
  const { size, routeLine } = props;
  const [lines, setLines] = useState<Line[]>([])

  useEffect(() => {
    const temp: Line[] = [];
    for (let i = 0; i < routeLine.length - 1; i++) {
      let position: Coordinate = [0, 0];
      let direction: "horizontal" | "vertical" = "horizontal";
      if (routeLine[i][0] === routeLine[i + 1][0]) {
        position = routeLine[i][1] < routeLine[i + 1][1] ? routeLine[i] : routeLine[i + 1];
        direction = "horizontal";
      } else if (routeLine[i][1] === routeLine[i + 1][1]) {
        position = routeLine[i][0] < routeLine[i + 1][0] ? routeLine[i] : routeLine[i + 1];
        direction = "vertical";
      }
      const thick = "8px"
      const backgroundColor = "green";
      const borderStyle = "2px solid #00000022";
      temp.push({
        from: routeLine[i],
        to: routeLine[i + 1],
        style: {
          position: "absolute",
          top: `calc(100%/${size - 1}*${position[0]})`,
          left: `calc(100%/${size - 1}*${position[1]})`,
          boxSizing: "border-box",
          backgroundColor,
          height: direction === "horizontal" ? thick : `calc(100%/${size - 1} + ${thick}/2)`,
          width: direction === "horizontal" ? `calc(100%/${size - 1} + ${thick}/2)` : thick,
          transform: direction === "horizontal" ? "translateY(-50%)" : "translateX(-50%)",
          borderBottom: direction === "horizontal" ? borderStyle : undefined,
          borderTop: direction === "horizontal" ? borderStyle : undefined,
          borderLeft: direction === "vertical" ? borderStyle : undefined,
          borderRight: direction === "vertical" ? borderStyle : undefined,
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
      {lines.map(line => {
        return (
          <div
            className="route-line"
            style={line.style}
            key={`${line.from}-${line.to}`}
          />
        )
      })}
    </div>
  )
}

export default memo(RouteLayer);
