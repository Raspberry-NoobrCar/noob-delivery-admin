import * as React from "react";

const Header = () => {
  return (
    <header style={{
      borderBottom: "1px solid #00000022"
    }}>
      <div style={{ 
        height: "64px",
        maxWidth: "960px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}>
        <div style={{ fontWeight: "500", fontSize: "1.2em"}}>菜鸡速递</div>
        <div style={{ flex: "auto"}} />
      </div>
    </header>
  )
};

export default Header;