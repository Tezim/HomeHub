import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DevicesScroll from "../components/DevicesScroll";
import PageHeader from "../components/PageHeader";
import { useEffect } from "react";
import { isAuthenticated } from "../components/helpers/Helpers";
import CustomLoading from "../components/custom/CustomLoading";
import { getDevicesFromDb } from "../services/DevicesService";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const authenticated = isAuthenticated();

  const getDevices = () => {
    setLoading(true);
    getDevicesFromDb()
      .then((response) => setDevices(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!authenticated) history("/");
    getDevices();
  }, [authenticated, history]);

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <div
      style={{
        display: authenticated ? "flex" : "none",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "#1f1f1f",
        borderRadius: "15px",
        padding: "5px",
        margin: "10px",
      }}
    >
      <PageHeader
        headerText={"Devices"}
        button={{
          event: () => console.log("Devices"),
          text: "Add device",
        }}
      />
      <div style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <DevicesScroll appliances={devices} />
      </div>
    </div>
  );
};

export default DevicesPage;
