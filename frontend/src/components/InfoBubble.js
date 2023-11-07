import { useState } from "react";
import CustomSlider from "./CustomSlider";

const InfoBubble = ({ text, info, img, slider, temperature }) => {
  const [isOn, setIsOn] = useState(slider);

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
        minWidth: "200px",
        fontSize: "25px",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>{text}</div>
      {info && <div style={{ fontSize: "35px" }}>{info} kW/h</div>}
      {img && (
        <img
          style={{
            width: "60px",
            height: "60px",
            filter: "invert(100%)",
            marginTop: "10px",
          }}
          src={img.src}
          alt={img.alt}
        />
      )}
      {slider !== undefined && (
        <CustomSlider toggle={isOn} onChange={() => setIsOn(!isOn)} />
      )}
      {temperature && <div style={{ fontSize: "35px" }}>{temperature}°C</div>}
    </div>
  );
};

export default InfoBubble;
