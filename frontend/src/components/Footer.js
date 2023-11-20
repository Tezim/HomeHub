const Footer = () => {
  return (
    <div
      style={{
        borderTop: "1px solid white",
        width: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "17px",
        fontFamily: "inherit",
        padding: "10px",
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ flex: 1, textAlign: "center" }}>ASOS</div>
      <div style={{ flex: 0, textAlign: "center" }}>© 2023 FEI STU</div>
      <div style={{ flex: 1, textAlign: "center" }}>Smart Home Controller</div>
    </div>
  );
};

export default Footer;
