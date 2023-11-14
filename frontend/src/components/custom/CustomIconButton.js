const CustomIconButton = ({ imgSrc, imgAlt, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "inherit",
        filter: "invert(100%)",
        border: "none",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img src={imgSrc} alt={imgAlt} style={{ width: "20px" }} />
    </button>
  );
};

export default CustomIconButton;
