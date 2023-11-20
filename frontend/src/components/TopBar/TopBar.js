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
          zIndex: "10000",
        }}
      >
        <div style={{ flex: 1 }}>
          <Logo />
        </div>
        <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <NavBar />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
