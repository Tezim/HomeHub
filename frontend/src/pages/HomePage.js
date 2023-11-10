import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import RoomSettings from "../components/RoomSettings";
import AppliancesSettings from "../components/AppliancesSettings";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../components/custom/CustomLoading";
import { isAuthenticated } from "../components/helpers/Helpers";

const dummyRooms = [
  {
    name: "Living Room",
    wattage: "40",
    lights: true,
    blinds: false,
    temperature: "21",
  },
  {
    name: "Kitchen",
    wattage: "92",
    lights: true,
    blinds: true,
    temperature: "23",
  },
  {
    name: "Garage",
    wattage: "4",
    lights: false,
    blinds: false,
    temperature: "19",
  },
];

const appliances = [
  {
    name: "Air condition",
    state: true,
  },
  {
    name: "Office Lights",
    state: true,
  },
  {
    name: "Vacuum",
    state: false,
  },
];

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [isSelected, setIsSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const autheticated = isAuthenticated();

  useEffect(() => {
    setIsSelected(rooms[0]?.name);
  }, [rooms]);

  useEffect(() => {
    setLoading(true);
    if (!autheticated) history("/");
    setRooms(dummyRooms);
    setLoading(false);
  }, []);

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <div
      style={{
        display: autheticated ? "flex" : "none",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "#1f1f1f",
        borderRadius: "15px",
        padding: "5px",
        margin: "10px",
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
                  color: isSelected === r.name ? "white" : "#858483",
                  borderBottom:
                    isSelected === r.name ? "1px solid orange" : "inherit",
                }}
                onClick={() => setIsSelected(r.name)}
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
      {rooms.map((r, i) => {
        return (
          <RoomSettings key={i} visible={isSelected !== r.name} room={r} />
        );
      })}
      <PageHeader headerText={"Quick use"} />
      <AppliancesSettings appliances={appliances} />
    </div>
  );
};

export default HomePage;
