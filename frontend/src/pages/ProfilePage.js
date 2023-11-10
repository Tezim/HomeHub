import { useNavigate } from "react-router-dom";
import CustomButton from "../components/custom/CustomButton";
import { logoutUser } from "../services/UserService";
import { isAuthenticated } from "../components/helpers/Helpers";
import { useEffect } from "react";

const ProfilePage = () => {
  const history = useNavigate();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) history("/");
  }, [authenticated, history]);

  const logout = async () => {
    logoutUser()
      .then(() => sessionStorage.removeItem("authetication"))
      .then(() => history("/"));
  };

  return (
    <div style={{ display: authenticated ? "flex" : "none" }}>
      ProfilePage
      <CustomButton
        buttonType={"button"}
        buttonText={"Logout"}
        onClick={() => logout()}
      />
    </div>
  );
};

export default ProfilePage;
