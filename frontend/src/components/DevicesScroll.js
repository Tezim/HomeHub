import { useCallback, useState } from "react";
import { getDevicesForRoomId } from "../services/DevicesService";
import "./scroll.css";

const DevicesScroll = ({ appliances, rooms, categories, onSelect }) => {
  const [isSelected, setIsSelected] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState("");
  const [isRoomsOpen, setIsRooms] = useState(true);
  const [isRoomOpen, setIsRoom] = useState("");
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [devicesForRoom, setDevicesForRoom] = useState([]);

  const getDevicesForRoom = useCallback((id) => {
    getDevicesForRoomId(id)
      .then((response) => setDevicesForRoom(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        overflow: "auto",
        overflowX: "hidden",
        maxHeight: "65vh",
        minHeight: "65vh",
      }}
      className="scrollable-div"
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "black",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          borderRadius: "10px",
          minWidth: "25vw",
          marginBottom: "5px",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          style={{
            fontSize: "25px",
            textAlign: "center",
            padding: "5px",
          }}
        >
          Categories
        </div>
        <span style={{ paddingRight: "5px", fontSize: "25px" }}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && (
        <div style={{ padding: "0px 10px 0px 10px", width: "100%" }}>
          {categories?.map((c, i) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#2b2b2b",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "5px 5px 5px 8px",
                    fontSize: "20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    margin: "5px 0px 5px 0px",
                  }}
                  key={i}
                  onClick={() => {
                    isCategoryOpen === c.name
                      ? setIsCategoryOpen("")
                      : setIsCategoryOpen(c.name);
                  }}
                >
                  <div>{c.name}</div>
                  <span style={{ paddingRight: "5px" }}>
                    {isCategoryOpen !== c.name ? "▲" : "▼"}
                  </span>
                </div>
                <div
                  style={{ padding: isCategoryOpen === c.name ? "5px" : "0px" }}
                >
                  {isCategoryOpen === c.name &&
                    c.devices?.map((d, i) => {
                      return (
                        <div
                          style={{
                            backgroundColor:
                              isSelected === d.device_id ? "orange" : "#454544",
                            width: "100%",
                            borderRadius: "10px",
                            padding: "5px",
                            marginBottom: "5px",
                            fontSize: "18px",
                          }}
                          key={i}
                          onClick={() => {
                            isSelected === d.device_id
                              ? setIsSelected("")
                              : setIsSelected(d.device_id);
                            onSelect(d);
                          }}
                        >
                          <div key={i}>{d.name}</div>
                        </div>
                      );
                    })}
                </div>
              </>
            );
          })}
        </div>
      )}
      <div
        style={{
          display: "flex",
          backgroundColor: "black",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          borderRadius: "10px",
          minWidth: "25vw",
          marginBottom: "5px",
          cursor: "pointer",
        }}
        onClick={() => setIsRooms(!isRoomsOpen)}
      >
        <div
          style={{
            fontSize: "25px",
            textAlign: "center",
            padding: "5px",
          }}
        >
          Rooms
        </div>
        <span style={{ paddingRight: "5px", fontSize: "25px" }}>
          {isRoomsOpen ? "▲" : "▼"}
        </span>
      </div>
      {isRoomsOpen && (
        <div style={{ padding: "0px 10px 0px 10px", width: "100%" }}>
          {rooms?.map((r, i) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#2b2b2b",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "5px 5px 5px 8px",
                    fontSize: "20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    margin: "5px 0px 5px 0px",
                  }}
                  key={i}
                  onClick={() => {
                    getDevicesForRoom(r.room_id);
                    isRoomOpen === r.name ? setIsRoom("") : setIsRoom(r.name);
                  }}
                >
                  <div>{r.name}</div>
                  <span style={{ paddingRight: "5px" }}>
                    {isRoomOpen !== r.name ? "▲" : "▼"}
                  </span>
                </div>
                <div style={{ padding: isRoomOpen === r.name ? "5px" : "0px" }}>
                  {isRoomOpen === r.name &&
                    devicesForRoom?.map((d, i) => {
                      return (
                        <div
                          style={{
                            backgroundColor:
                              isSelected === d.device_id ? "orange" : "#454544",
                            width: "100%",
                            borderRadius: "10px",
                            padding: "5px",
                            marginBottom: "5px",
                            fontSize: "18px",
                          }}
                          key={i}
                          onClick={() => {
                            isSelected === d.device_id
                              ? setIsSelected("")
                              : setIsSelected(d.device_id);
                            onSelect(d);
                          }}
                        >
                          <div>{d.name}</div>
                        </div>
                      );
                    })}
                </div>
              </>
            );
          })}
        </div>
      )}
      <div
        style={{
          display: "flex",
          backgroundColor: "black",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          borderRadius: "10px",
          minWidth: "25vw",
          marginBottom: "5px",
          cursor: "pointer",
        }}
        onClick={() => setIsDevicesOpen(!isDevicesOpen)}
      >
        <div
          style={{
            fontSize: "25px",
            textAlign: "center",
            padding: "5px",
          }}
        >
          All Devices
        </div>
        <span style={{ paddingRight: "5px", fontSize: "25px" }}>
          {isDevicesOpen ? "▲" : "▼"}
        </span>
      </div>
      <div style={{ padding: isDevicesOpen ? "5px" : "0px", width: "100%" }}>
        {isDevicesOpen &&
          appliances?.map((d, i) => {
            return (
              <div
                style={{
                  backgroundColor:
                    isSelected === d.device_id ? "orange" : "#454544",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "5px",
                  marginBottom: "5px",
                  fontSize: "25px",
                }}
                onClick={() => {
                  isSelected === d.device_id
                    ? setIsSelected("")
                    : setIsSelected(d.device_id);
                  onSelect(d);
                }}
                key={i}
              >
                {d.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DevicesScroll;
