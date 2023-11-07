import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacer from "./Spacer";

const NavBarIcon = ({ imgSrc, alt, destination, last }) => {
  const history = useNavigate();
  const [isHovered, setIsHovered] = useState();
  return (
    <>
      <div
        style={{
          backgroundColor: isHovered ? "orange" : "transparent",
          borderRadius: "10px",
          padding: "7px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "64px",
          width: "64px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          style={{
            backgroundColor: "inherit",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            height: "100%",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => history(destination)}
        >
          <img
            src={imgSrc}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              filter: "invert(100%)",
            }}
            alt={alt}
          />
        </button>
      </div>
      {!last ? <Spacer /> : <div style={{ marginLeft: "10px" }} />}
    </>
  );
};

export default NavBarIcon;
