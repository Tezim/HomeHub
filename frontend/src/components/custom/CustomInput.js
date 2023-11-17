const CustomInput = ({
  inputText,
  inputType,
  inputWidth,
  value,
  setValue,
  required,
  placeholder,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: "10px", fontSize: "22px" }}>
          {inputText}
        </div>
        {required && (
          <div
            style={{ fontFamily: "inherit", fontSize: "22px", color: "red" }}
          >
            *
          </div>
        )}
      </div>
      <input
        value={value}
        type={inputType}
        placeholder={placeholder}
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
