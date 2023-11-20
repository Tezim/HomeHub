import Clock from "./Clock";
import GithubLink from "./GithubLink";
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
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "15px" }}>
            <GithubLink />
          </div>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
