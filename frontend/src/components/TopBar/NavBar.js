import NavBarIcon from "./NavBarIcon";

const NavBar = () => {
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
        imgSrc={"/setting.png"}
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
        last
      />
    </div>
  );
};

export default NavBar;
