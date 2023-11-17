import { useState } from "react";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";

const AddRoomModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [story, setStory] = useState();
  const [size, setSize] = useState();

  const createRoomObject = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("story", story);
    formData.append("size", size);
    return formData;
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
          height: "50vh",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: "inherit", fontSize: "40px" }}>Add Room</div>
        <CustomInput
          inputText={"Room name"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={name}
          required
          setValue={(e) => setName(e)}
        />
        <CustomInput
          inputText={"Room size"}
          inputType={"number"}
          inputWidth={"50vw"}
          value={size}
          required
          setValue={(e) => setSize(e)}
        />
        <CustomInput
          inputText={"Room story"}
          inputType={"number"}
          inputWidth={"50vw"}
          value={story}
          required
          setValue={(e) => setStory(e)}
        />
        <CustomButton
          buttonType={"button"}
          buttonText={"Create"}
          onClick={() => {
            onSubmit(createRoomObject());
            onClose();
          }}
          disabled={!name || !story || !size}
        />
      </div>
    </div>
  );
};

export default AddRoomModal;
