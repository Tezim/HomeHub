import NavBar from "./TopBar/TopBar";

const Layout = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <div style={{ flex: 1, width: "100%", padding: "10px" }}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
