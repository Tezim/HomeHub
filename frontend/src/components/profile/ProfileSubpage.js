const ProfileSubpage = ({ subpageText, selected, onSelect }) => {
  return (
    <div
      style={{
        marginRight: "10px",
        cursor: "pointer",
        paddingBottom: "2px",
        color: selected === subpageText ? "white" : "#858483",
        borderBottom: selected === subpageText ? "1px solid orange" : "inherit",
      }}
      onClick={onSelect}
    >
      {subpageText}
    </div>
  );
};

export default ProfileSubpage;
