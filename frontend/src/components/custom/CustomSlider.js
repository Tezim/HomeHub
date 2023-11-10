import React from "react";

const CustomSlider = ({ toggle, onChange }) => {
  const toggleButton = () => {
    onChange();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
        width: "100px",
        height: "40px",
        borderRadius: "50px",
        cursor: "pointer",
        backgroundColor: toggle ? "#d98d02" : "gray",
        position: "relative",
        transition: "background-color 0.25s ease-in-out",
      }}
      onClick={toggleButton}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          position: "absolute",
          top: "5px",
          left: toggle ? "calc(100% - 35px)" : "5px",
          transition: "left 0.25s ease-in-out",
          backgroundColor: toggle ? "gray" : "orange",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "15px",
          fontSize: "15px",
          color: "#2e2e2e",
          pointerEvents: "none",
        }}
      >
        {toggle ? "ON" : ""}
      </span>
      <span
        style={{
          position: "absolute",
          right: "15px",
          fontSize: "15px",
          color: "#2e2e2e",
          pointerEvents: "none",
        }}
      >
        {toggle ? "" : "OFF"}
      </span>
    </div>
  );
};

export default CustomSlider;
