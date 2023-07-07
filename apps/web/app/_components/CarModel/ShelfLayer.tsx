import React, { Children, ReactNode } from "react";

const Wheel = () => {

  return (
    <div
      className="wheel"
      style={{
        background: "black",
        height: "48px",
        width: "48px",
        borderRadius: "50%"
      }}
    >

    </div>
  )
}

const ShelfLayer = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <div
      className="layer shelf-layer"
      style={{
        position: "relative"
      }}
    >
      <div
        className="black-body"
        style={{
          background: "linear-gradient(to top, black 10%, #000000cc 72%, #00000066 90%, black)",
          borderRadius: "40px",
          padding: "1px 0 1px 42px",
          marginBottom: "20px",
        }}
      >
        <div
          className="white-panel"
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            aspectRatio: "8 / 5",
            paddingTop: "12px",
            paddingBottom: "1px",
            width: "240px",
            borderRadius: "24px",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "180px",
              aspectRatio: "5 / 3",
              border: "1px dashed #00000022",
              margin: "0 auto",
              backgroundColor: "#000000aa",
              overflow: "hidden"
            }}
          >
            { children }
          </div>
          <div
            className="wheels" 
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              transform: "translateY(42%)",
              padding: "0 24px",
              boxSizing: "border-box"
            }}
          >
            <Wheel />
            <Wheel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShelfLayer;
