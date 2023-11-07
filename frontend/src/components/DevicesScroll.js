import { useState } from "react";

const DevicesScroll = ({ appliances }) => {
  const [isSelected, setIsSelected] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "60vh",
      }}
    >
      {appliances.map((a) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: isSelected === a.name ? "orange" : "#454544",
              borderRadius: "20px",
              padding: "10px",
              marginBottom: "10px",
              flex: 1,
              minWidth: "25vw",
            }}
            onClick={() => setIsSelected(a.name)}
          >
            <div
              style={{
                fontSize: "25px",
                color: "black",
              }}
            >
              {a.name}
            </div>
            <div style={{ fontSize: "15px", color: "#858483" }}>{a.room}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DevicesScroll;
