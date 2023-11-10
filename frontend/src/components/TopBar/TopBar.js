import Clock from "./Clock";
import Logo from "./Logo";
import NavBar from "./NavBar";

const TopBar = () => {
  return (
    <div style={{ borderBottom: "2px solid white" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Logo />
        <NavBar />
        <Clock />
      </div>
    </div>
  );
};

export default TopBar;
