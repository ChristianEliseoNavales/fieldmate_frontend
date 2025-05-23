import React from "react";

function Skeleton({ width = "100%", height = "1em", style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "4px",
        background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
        backgroundSize: "200% 100%",
        animation: "loadingSkeleton 1.5s infinite",
        ...style,
      }}
    />
  );
}

export default Skeleton;
