import { useState } from "react";
import CustomButton from "../custom/CustomButton";
import CustomInput from "../custom/CustomInput";

const EditProfileModal = ({ onClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const createEditProfileObject = () => {
    const formData = new FormData();
    if (username) formData.append("username", username);
    if (email) formData.append("email", email);
    if (phone) formData.append("phone", phone);
    return formData;
  };

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
        <div style={{ fontFamily: "inherit", fontSize: "40px" }}>
          Edit Profile
        </div>
        <CustomInput
          inputText={"Username"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={username}
          setValue={(e) => setUsername(e)}
        />
        <CustomInput
          inputText={"Email"}
          inputType={"email"}
          inputWidth={"50vw"}
          value={email}
          placeholder={"example@email.com"}
          setValue={(e) => setEmail(e)}
        />
        <CustomInput
          inputText={"Phone number"}
          inputType={"text"}
          inputWidth={"50vw"}
          value={phone}
          placeholder={"+421901234567"}
          setValue={(e) => setPhone(e)}
        />
        <CustomButton
          buttonType={"button"}
          buttonText={"Save changes"}
          onClick={() => {
            onSubmit(createEditProfileObject());
            onClose();
          }}
          disabled={!username && !email && !phone}
        />
      </div>
    </div>
  );
};

export default EditProfileModal;
