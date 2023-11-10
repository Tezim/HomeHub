import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import RoomSettings from "../components/RoomSettings";
import AppliancesSettings from "../components/AppliancesSettings";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../components/custom/CustomLoading";
import { isAuthenticated } from "../components/helpers/Helpers";
import { getRoomsFromDb } from "../services/RoomsService";
import {
  getDevicesForRoom,
  getDevicesFromDb,
} from "../services/DevicesService";
import { getCategoriesFromDb } from "../services/CategoriesService";

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const authenticated = isAuthenticated();

  const getRooms = () => {
    getRoomsFromDb()
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getCategories = () => {
    getCategoriesFromDb().then((response) => {
      setCategories(response.data);
    });
  };

  const getDevices = () => {
    getDevicesFromDb()
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getDevicesRoom = () => {
    getDevicesForRoom(selectedRoom?.room_id)
      .then((response) => setDevices(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setSelectedRoom(rooms[0]);
  }, [rooms]);

  useEffect(() => {
    getDevicesRoom();
  }, [selectedRoom]);

  useEffect(() => {
    if (!authenticated) history("/");
    let promises = [];
    promises.push(getRooms());
    promises.push(getCategories());
    setLoading(true);
    Promise.all(promises).then(() => setLoading(false));
  }, [authenticated, history]);

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: authenticated ? "flex" : "none",
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: "#1f1f1f",
          borderRadius: "15px",
          padding: "5px",
          margin: "10px",
          maxWidth: "75vw",
        }}
      >
        <PageHeader
          headerText={"Summary"}
          button={{
            event: () => console.log("Home Page"),
            text: "Add device",
          }}
        />
        <div
          style={{
            display: "flex",
            margin: "5px 0px 0px 10px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            {rooms.map((r, i) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    marginRight: "20px",
                    color: selectedRoom?.name === r.name ? "white" : "#858483",
                    borderBottom:
                      selectedRoom?.name === r.name
                        ? "1px solid orange"
                        : "inherit",
                  }}
                  onClick={() => setSelectedRoom(r)}
                  key={i}
                >
                  {r.name}
                </div>
              );
            })}
          </div>
          <button
            style={{
              borderRadius: "10px",
              border: "none",
              backgroundColor: "orange",
              fontFamily: "inherit",
              fontSize: "15px",
              padding: "3px 8px 3px 8px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Customize
              <img
                src={"/equalizer.png"}
                style={{ width: "20px", height: "20px", marginLeft: "10px" }}
                alt={"customize"}
              />
            </div>
          </button>
        </div>
        <RoomSettings categories={categories} />
        <PageHeader headerText={"Quick use"} />
        <AppliancesSettings appliances={devices} />
      </div>
    </div>
  );
};

export default HomePage;
