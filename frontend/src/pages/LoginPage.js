import { useState, useEffect } from "react";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/custom/CustomInput";
import CustomButton from "../components/custom/CustomButton";
import CustomLoading from "../components/custom/CustomLoading";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const login = async () => {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    loginUser(formData)
      .then((response) => {
        sessionStorage.setItem("authenticated", response.data.user.email);
      })
      .then(() => history("/home"));
  };

  useEffect(() => {
    sessionStorage.removeItem("authenticated");
  }, []);

  return (
    <div>
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
            height: "25rem",
            width: "30rem",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ fontSize: "35px", marginBottom: "10px" }}>Login</div>
          <CustomInput
            inputText={"Email:"}
            inputType={"text"}
            value={userName}
            setValue={(e) => setUserName(e)}
          />
          <CustomInput
            inputText={"Password:"}
            inputType={"password"}
            value={password}
            setValue={(e) => setPassword(e)}
          />
          <div style={{}} />
          <CustomButton
            buttonText={"Login"}
            buttonType={"button"}
            onClick={() => login()}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
