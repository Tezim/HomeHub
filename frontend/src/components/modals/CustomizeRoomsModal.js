import { useEffect, useState, useRef } from "react";
import CustomButton from "../custom/CustomButton";
import CustomIconButton from "../custom/CustomIconButton";

const CustomizeRoomsModal = ({ show, onClose, onSubmit, onDelete, rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState({});
  const [newName, setNewName] = useState("");
  const inputRef = useRef(null);

  const createUpdateObject = () => {
    const formData = new FormData();
    formData.append("name", newName);
    return formData;
  };

  useEffect(() => {
    if (selectedRoom !== null) {
      inputRef.current?.focus();
    }
  }, [selectedRoom]);

  if (!show) return;
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
      }}
      onClick={() => {
        onClose();
        setSelectedRoom({});
        setNewName("");
      }}
    >
      <div
        style={{
          backgroundColor: "#1f1f1f",
          width: "65vw",
          height: "40vh",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: "inherit", fontSize: "40px" }}>Customize</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "20px",
            overflow: "auto",
            width: "55vw",
          }}
        >
          {rooms.map((r, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px",
                  borderBottom: "1px solid #ddd",
                  borderTop: i === 0 ? "1px solid #ddd" : "",
                }}
                key={i}
              >
                {selectedRoom?.name !== r.name && <div>{r.name}</div>}
                {selectedRoom?.name === r.name && (
                  <input
                    ref={inputRef}
                    value={newName}
                    style={{
                      backgroundColor: "inherit",
                      border: "none",
                      fontSize: "inherit",
                      fontFamily: "inherit",
                      color: "inherit",
                    }}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <CustomIconButton
                    imgSrc={"/edit.png"}
                    imgAlt={"edit"}
                    onClick={() => setSelectedRoom(r)}
                  />
                  <div style={{ paddingRight: "5px" }} />
                  <CustomIconButton
                    imgSrc={"/delete.png"}
                    imgAlt={"delete"}
                    onClick={() => onDelete(r.room_id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex" }}>
          <CustomButton
            buttonText={"Clear"}
            buttonType={"button"}
            onClick={() => {
              setSelectedRoom({});
              setNewName("");
            }}
          />
          <div style={{ paddingRight: "5px" }} />
          <CustomButton
            buttonText={"Save"}
            buttonType={"button"}
            onClick={() => {
              onSubmit({
                id: selectedRoom?.room_id,
                data: createUpdateObject(),
              });
              onClose();
              setSelectedRoom({});
              setNewName("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizeRoomsModal;
