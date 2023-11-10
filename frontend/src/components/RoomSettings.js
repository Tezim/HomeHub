import InfoBubble from "./InfoBubble";

const RoomSettings = ({ categories }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          margin: "15px 10px 15px 10px",
        }}
      >
        {categories.map((c, i) => {
          return <InfoBubble key={i} text={c.name} />;
        })}
      </div>
    </div>
  );
};

export default RoomSettings;
