import ApplianceBubble from "./ApplianceBubble";

const AppliancesSettings = ({ appliances, visible }) => {
  return (
    <div hidden={visible} style={{ overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          margin: "15px 10px 15px 10px",
        }}
      >
        {appliances?.map((a, i) => {
          return <ApplianceBubble key={i} appliance={a} />;
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "orange",
            border: "none",
            borderRadius: "10px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img
            style={{ widht: "25px", height: "25px" }}
            src={"/plus.png"}
            alt={"add"}
          />
        </button>
      </div>
    </div>
  );
};

export default AppliancesSettings;
