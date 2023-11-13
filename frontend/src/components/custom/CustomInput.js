const CustomInput = ({ inputText, inputType, inputWidth, value, setValue }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <label style={{ marginBottom: "10px", fontSize: "22px" }}>
        {inputText}
      </label>
      <input
        value={value}
        type={inputType}
        style={{
          width: inputWidth,
          height: "4rem",
          borderRadius: "10px",
          paddingLeft: "5px",
          backgroundColor: "black",
          border: "none",
          fontFamily: "inherit",
          color: "white",
          fontSize: "22px",
        }}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
