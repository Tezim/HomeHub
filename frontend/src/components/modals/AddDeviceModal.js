import { useState } from "react";
import CustomButton from "../custom/CustomButton";
import CustomDropdown from "../custom/CustomDropdown";
import CustomInput from "../custom/CustomInput";

const AddDeviceModal = ({
  show,
  rooms,
  categories,
  onClose,
  onSubmit,
  selectedRoom,
}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState(null);

  const createDeviceObject = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("room_id", room.room_id);
    formData.append("ip_address", ipAddress);
    formData.append("mac_address", macAddress);
    formData.append("more_info", info);
    formData.append("category", category.category_id);
    formData.append("usage", 0);
    return formData;
  };

  const handleKeyPress = (event) => {
    if (
      event.key === "Enter" &&
      name &&
      ipAddress &&
      macAddress &&
      room &&
      category
    ) {
      onSubmit(createDeviceObject());
      onClose();
    }
  };

  if (!show) return;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#1f1f1f",
          width: "55vw",
          height: "850px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          outline: "none",
        }}
        onClick={(e) => e.stopPropagation()}
        tabIndex={"0"}
        onKeyDown={handleKeyPress}
      >
        <div style={{ fontFamily: "inherit", fontSize: "40px" }}>
          Add Device
        </div>
        <CustomInput
          inputText={"Device Name"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={name}
          required
          setValue={(e) => setName(e)}
        />
        <CustomInput
          inputText={"IP Address"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={ipAddress}
          placeholder={"192.168.0.1"}
          required
          setValue={(e) => setIpAddress(e)}
        />
        <CustomInput
          inputText={"Mac Address"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={macAddress}
          placeholder={"00-B0-D0-63-C2-26"}
          required
          setValue={(e) => setMacAddress(e)}
        />
        <CustomDropdown
          options={rooms}
          selectedItem={selectedRoom}
          onSelect={(option) => setRoom(option)}
          required
          dropdownText={"Room"}
        />
        <CustomDropdown
          options={categories}
          onSelect={(option) => setCategory(option)}
          required
          dropdownText={"Category"}
        />
        <CustomInput
          inputText={"Description"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={info}
          setValue={(e) => setInfo(e)}
        />
        <CustomButton
          buttonType={"button"}
          buttonText={"Create"}
          onClick={() => {
            onSubmit(createDeviceObject());
            onClose();
          }}
          disabled={!name || !ipAddress || !room || !macAddress || !category}
        />
      </div>
    </div>
  );
};

export default AddDeviceModal;
