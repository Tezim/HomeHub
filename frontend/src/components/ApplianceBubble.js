import { useState } from "react";
import CustomSlider from "./custom/CustomSlider";

const ApplianceBubble = ({ appliance }) => {
  const adjustFontSize = (word) => {
    let baseSize = 25;
    let maxLength = 8;

    if (word.length > maxLength) {
      return `${baseSize - (word.length - maxLength)}px`;
    } else {
      return `${baseSize}px`;
    }
  };
  const [isOn, setIsOn] = useState(appliance.status);
  return (
    <div
      style={{
        flex: "1 0 calc(20% - 10px)",
        maxWidth: "calc(20% - 10px)",
        background: isOn ? "orange" : "#454544",
        padding: "10px",
        borderRadius: "15px",
        textAlign: "center",
        marginBottom: "10px",
        minWidth: "350px",
        fontSize: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "5px 10px 5px 10px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{ fontSize: adjustFontSize(appliance.name), color: "black" }}
          >
            {appliance.name}
          </div>
          <div style={{ fontSize: "15px", color: "#858483" }}>
            {appliance.status ? "Connected" : "Disconnected"}
          </div>
        </div>
        <CustomSlider toggle={isOn} onChange={() => setIsOn(!isOn)} />
      </div>
    </div>
  );
};

export default ApplianceBubble;
