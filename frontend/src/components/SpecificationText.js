const SpecificationText = ({ spec, value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid white",
        fontSize: "30px",
        justifyContent: "space-between",
        marginBottom: "10px",
        paddingBottom: "5px",
      }}
    >
      <div style={{ width: "60vw", whiteSpace: "nowrap", textAlign: "center" }}>
        {spec}
      </div>
      <div style={{ width: "60vw", whiteSpace: "nowrap", textAlign: "center" }}>
        {value}
      </div>
    </div>
  );
};

export default SpecificationText;
