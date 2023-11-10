import { useState, useEffect } from "react";
import { isAuthenticated } from "../helpers/Helpers";
import Clock from "./Clock";
import Logo from "./Logo";
import NavBar from "./NavBar";

const TopBar = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [auth]);

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
        {auth && <NavBar />}
        <Clock />
      </div>
    </div>
  );
};

export default TopBar;
