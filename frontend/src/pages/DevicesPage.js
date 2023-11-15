import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DevicesScroll from "../components/DevicesScroll";
import PageHeader from "../components/PageHeader";
import { useEffect } from "react";
import { isAuthenticated } from "../components/helpers/Helpers";
import CustomLoading from "../components/custom/CustomLoading";
import { getDevicesFromDb } from "../services/DevicesService";
import { getCategoriesFromDb } from "../services/CategoriesService";
import { getRoomsFromDb } from "../services/RoomsService";
import SpecificationText from "../components/SpecificationText";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const history = useNavigate();
  const authenticated = isAuthenticated();

  const getDevices = () => {
    setLoading(true);
    getDevicesFromDb()
      .then((response) => setDevices(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const getCategories = () => {
    setLoading(true);
    getCategoriesFromDb()
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const getRooms = () => {
    setLoading(true);
    getRoomsFromDb()
      .then((response) => setRooms(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  useEffect(() => {
    if (!authenticated) history("/");
    let promises = [];
    promises.push(getDevices());
    promises.push(getCategories());
    promises.push(getRooms());
    Promise.all(promises);
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
        <DevicesScroll
          appliances={devices}
          categories={categories}
          rooms={rooms}
          onSelect={(device) => setSelectedDevice(device)}
        />
        {Object.keys(selectedDevice).length > 0 && (
          <div
            style={{
              backgroundColor: "#2b2b2b",
              width: "70%",
              margin: "5px",
              borderRadius: "10px",
              minHeight: "65vh",
              padding: "20px",
              fontFamily: "inherit",
              fontSize: "25px",
            }}
          >
            <div style={{ borderBottom: "1px solid orange", padding: "10px" }}>
              Specifications
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "30px 20px 20px 20px",
              }}
            >
              <SpecificationText spec={"Room"} value={selectedDevice.name} />
              <SpecificationText
                spec={"IP Address"}
                value={selectedDevice.IP_address}
              />
              <SpecificationText
                spec={"MAC Address"}
                value={selectedDevice.MAC_address}
              />
              <SpecificationText
                spec={"Additional Info"}
                value={selectedDevice.add_info}
              />
              <SpecificationText
                spec={"Last Modified"}
                value={formatDate(selectedDevice.modified)}
              />
              <SpecificationText
                spec={"Created"}
                value={formatDate(selectedDevice.created)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesPage;
