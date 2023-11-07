import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    axios
      .post("http://127.0.0.1:5000/login", formData)
      .then((response) => {
        console.log(response);
      })
      .then((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <label>Username:</label>
        <input
          id={"username"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Password:</label>
        <input
          id={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type={"button"} onClick={login}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
