import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/ProfileService";
import NavBarIcon from "./NavBarIcon";
import { isAuthenticated } from "../helpers/Helpers";

const NavBar = () => {
  const history = useNavigate();
  const authenticated = isAuthenticated();

  const logout = async () => {
    if (authenticated) {
      logoutUser()
        .then(() => sessionStorage.removeItem("authetication"))
        .then(() => history("/"));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NavBarIcon
        imgSrc={"/home.png"}
        destination={"/home"}
        alt={"homeButton"}
      />
      <NavBarIcon
        imgSrc={"/devices.png"}
        destination={"/devices"}
        alt={"devicesButton"}
      />
      <NavBarIcon
        imgSrc={"/pie-chart.png"}
        destination={"/statistics"}
        alt={"statisticsButton"}
      />
      <NavBarIcon
        imgSrc={"/user.png"}
        destination={"/profile"}
        alt={"userButton"}
      />
      <NavBarIcon
        imgSrc={"/logout.png"}
        destination={"/"}
        alt={"logout"}
        onLogout={() => logout()}
        last
      />
    </div>
  );
};

export default NavBar;
