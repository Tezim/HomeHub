import CustomSlider from "./custom/CustomSlider";

const ApplianceBubble = ({ appliance, onSliderClick }) => {
  const adjustFontSize = (word) => {
    let baseSize = 25;
    let maxLength = 8;

    if (word.length > maxLength) {
      return `${baseSize - (word.length - maxLength)}px`;
    } else {
      return `${baseSize}px`;
    }
  };

  const changeDeviceState = () => {
    const formData = new FormData();
    formData.append("name", appliance.name);
    formData.append("room_id", appliance.room_id);
    formData.append("ip_address", appliance.IP_address);
    formData.append("mac_address", appliance.MAC_address);
    formData.append("more_info", appliance.add_info);
    formData.append("category", appliance.category);
    formData.append("status", appliance.status === 1 ? 0 : 1);
    return formData;
  };

  return (
    <div
      style={{
        flex: "1 0 calc(20% - 10px)",
        maxWidth: "calc(20% - 10px)",
        background: appliance.status === 1 ? "orange" : "#454544",
        padding: "10px",
        borderRadius: "15px",
        textAlign: "center",
        marginBottom: "10px",
        minWidth: "350px",
        fontSize: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "5px 10px 5px 10px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{ fontSize: adjustFontSize(appliance.name), color: "black" }}
          >
            {appliance.name}
          </div>
          <div style={{ fontSize: "15px", color: "#858483" }}>
            {appliance.status ? "Connected" : "Disconnected"}
          </div>
        </div>
        <CustomSlider
          toggle={appliance.status === 1}
          onChange={() =>
            onSliderClick(appliance.device_id, changeDeviceState())
          }
        />
      </div>
    </div>
  );
};

export default ApplianceBubble;
