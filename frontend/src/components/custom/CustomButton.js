const CustomButton = ({ buttonText, buttonType, onClick, disabled }) => {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      style={{
        backgroundColor: "orange",
        border: "none",
        borderRadius: "10px",
        padding: "15px 25px",
        fontFamily: "inherit",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
