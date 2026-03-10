import React from "react";

const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    <span style={{ marginLeft: "1rem" }}>Loading...</span>
  </div>
);

export default Loader;
