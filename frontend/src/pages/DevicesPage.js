import DevicesScroll from "../components/DevicesScroll";
import PageHeader from "../components/PageHeader";

const appliances = [
  {
    name: "Air condition",
    room: "Living Room",
    state: true,
  },
  {
    name: "Office Lights",
    room: "Living Room",
    state: true,
  },
  {
    name: "Vacuum",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum1",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum2",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum3",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum4",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum5",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum6",
    room: "Kitchen",
    state: false,
  },
  {
    name: "Vacuum7",
    room: "Kitchen",
    state: false,
  },
];

const DevicesPage = () => {
  return (
    <div
      style={{
        display: "flex",
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
        <DevicesScroll appliances={appliances} />
        <div>hello</div>
      </div>
    </div>
  );
};

export default DevicesPage;
