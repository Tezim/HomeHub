import { useNavigate } from "react-router-dom";

const Logo = () => {
  const history = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
      onClick={() => history("/home")}
    >
      <div
        style={{
          fontSize: "50px",
          paddingTop: "4px",
          marginRight: "2px",
        }}
      >
        Home
      </div>
      <div
        style={{
          fontSize: "50px",
          borderRadius: "10px",
          backgroundColor: "orange",
          padding: "4px",
        }}
      >
        <div style={{ color: "black" }}>Hub</div>
      </div>
    </div>
  );
};

export default Logo;
