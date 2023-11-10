import InfoBubble from "./InfoBubble";

const RoomSettings = ({ room, visible }) => {
  return (
    <div hidden={visible}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          margin: "15px 10px 15px 10px",
        }}
      >
        <InfoBubble text={"Current Wattage"} info={room.wattage} />
        <InfoBubble
          text={"Statistics"}
          img={{ src: "/bar-chart.png", alt: "statistics" }}
        />
        <InfoBubble text={"Lights"} slider={room.lights} />
        <InfoBubble text={"Blinds"} slider={room.blinds} />
        <InfoBubble text={"Temperature"} temperature={room.temperature} />
      </div>
    </div>
  );
};

export default RoomSettings;
