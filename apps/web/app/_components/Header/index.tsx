import * as React from "react";

const Header = () => {
  return (
    <header style={{
      borderBottom: "1px solid #00000022",
      background: "#1677ff",
    }}>
      <div style={{
        maxWidth: "960px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        padding: "16px 20px",
        color: "#fff"
      }}>
        <div style={{ fontWeight: "500", fontSize: "1.2em"}}>Noob-delivery</div>
        <div style={{ flex: "auto"}} />
      </div>
    </header>
  )
};

export default Header;