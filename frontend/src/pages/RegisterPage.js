import { useState } from "react";
import CustomButton from "../components/custom/CustomButton";
import CustomInput from "../components/custom/CustomInput";
import { registerUser } from "../services/ProfileService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const history = useNavigate();

  const register = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    registerUser(formData)
      .then(() => history("/"))
      .catch((error) => console.log(error));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("event");
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#1f1f1f",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "10px",
            height: "700px",
            width: "45vw",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ fontSize: "35px", marginBottom: "10px" }}>Sign Up</div>
          <CustomInput
            inputWidth={"25vw"}
            inputText={"Username:"}
            inputType={"text"}
            value={username}
            setValue={(e) => setUsername(e)}
            required
          />
          <CustomInput
            inputWidth={"25vw"}
            inputText={"Password:"}
            inputType={"password"}
            value={password}
            setValue={(e) => setPassword(e)}
            required
          />
          <CustomInput
            inputWidth={"25vw"}
            inputText={"Email:"}
            inputType={"email"}
            value={email}
            setValue={(e) => setEmail(e)}
            placeholder={"example@email.com"}
            required
          />
          <CustomInput
            inputWidth={"25vw"}
            inputText={"Phone:"}
            inputType={"text"}
            value={phone}
            setValue={(e) => setPhone(e)}
            placeholder={"+421xxxxxxxxx"}
            required
          />
          <CustomButton
            buttonText={"Sign up"}
            buttonType={"button"}
            disabled={!username || !password || !email || !phone}
            onClick={() => register()}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
