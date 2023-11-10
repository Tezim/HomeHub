const PageHeader = ({ headerText, visible, button }) => {
  return (
    <div hidden={visible}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5px",
          padding: "5px",
        }}
      >
        <div style={{ fontSize: "35px" }}>{headerText}</div>
        {button && (
          <button
            style={{
              backgroundColor: "orange",
              border: "none",
              borderRadius: "15px",
              fontSize: "20px",
              color: "black",
              fontFamily: "inherit",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={button.event}
            type={"button"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {button.text}
              <div
                style={{
                  backgroundColor: "#cc880a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "15px",
                  height: "30px",
                  width: "30px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={"/plus.png"}
                  alt={"add"}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>
          </button>
        )}
      </div>
      <div style={{ borderBottom: "1px solid white" }} />
    </div>
  );
};

export default PageHeader;
