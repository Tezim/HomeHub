import { useEffect } from "react";
import { isAuthenticated } from "../components/helpers/Helpers";
import { useNavigate } from "react-router-dom";

const StatisticsPage = () => {
  const history = useNavigate();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) history("/");
  }, []);

  return (
    <div style={{ display: authenticated ? "flex" : "none" }}>
      StatisticsPage
    </div>
  );
};

export default StatisticsPage;
