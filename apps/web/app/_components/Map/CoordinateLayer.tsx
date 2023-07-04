import { memo } from "react";

interface IProps {
  size: number;
}

const CoordinateLayer = (props: IProps) => {
  const { size } = props;

  return (
    <div
      className="layer coordinate-layer"
      style={{
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        border: '1px solid #00000022',
        width: "100%",
        height: "100%",
        zIndex: "10"
      }}
    >
      { new Array(size - 1).fill(0).map((_, rowIndex) => {
        return new Array(size - 1).fill(0).map((_, colIndex) => {
          return <div
            className="block"
            key={`${rowIndex}-${colIndex}`}
            style={{
              aspectRatio: "1",
              flex: `0 calc(100%/${size - 1})`,
              boxSizing: "border-box",
              border: '1px solid #00000022'
             }}
            />;
        })
      })}
    </div>
  )
}

export default memo(CoordinateLayer);
