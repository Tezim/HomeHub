const CustomButton = ({ buttonText, buttonType, onClick }) => {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      style={{
        backgroundColor: "orange",
        border: "none",
        borderRadius: "10px",
        padding: "10px 15px",
        fontFamily: "inherit",
        fontSize: "20px",
        fontWeight: "bold",
        width: "10rem",
        cursor: "pointer",
      }}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
