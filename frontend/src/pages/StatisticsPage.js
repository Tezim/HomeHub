import { useCallback, useEffect, useState } from "react";
import { hoursAsList, isAuthenticated } from "../components/helpers/Helpers";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../components/custom/CustomLoading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDevicesFromDb } from "../services/DevicesService";
import { GetStatisticsForDevice } from "../services/StatisticsService";

const StatisticsPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [loadingData, setLoadingData] = useState(false);
  const [stats, setStats] = useState([]);
  const history = useNavigate();
  const authenticated = isAuthenticated();

  const getDevices = () => {
    setLoading(true);
    getDevicesFromDb()
      .then((response) => setDevices(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const getStatistics = useCallback(() => {
    setLoadingData(true);
    GetStatisticsForDevice(selectedDevice.device_id)
      .then((response) => setStats(createGraphData(response.data.temperature)))
      .catch((error) => {
        console.log(error);
        setStats([]);
      })
      .finally(() => setLoadingData(false));
  }, [selectedDevice]);

  const createGraphData = (array) => {
    return array.map((temp, index) => ({
      temperature: Number(temp),
      hour: index,
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#1f1f1f",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p>{`Hour: ${label}`}</p>
          <p
            style={{ color: "orange" }}
          >{`Temperature: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (!authenticated) history("/");
    getDevices();
  }, [authenticated, history]);

  useEffect(() => {
    if (Object.keys(selectedDevice).length > 0) getStatistics();
  }, [selectedDevice, getStatistics]);

  const adjustFontSize = (word) => {
    let baseSize = 25;
    let maxLength = 10;

    if (word.length > maxLength) {
      return `${baseSize - (word.length - maxLength)}px`;
    } else {
      return `${baseSize}px`;
    }
  };

  useEffect(() => {
    console.log(stats);
  }, [stats]);

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
          flexDirection: "row",
          flexGrow: 1,
          backgroundColor: "#1f1f1f",
          borderRadius: "15px",
          padding: "10px",
          margin: "10px",
          maxHeight: "80vh",
          maxWidth: "80vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "20rem",
            paddingRight: "10px",
            overflow: "auto",
          }}
        >
          {devices?.map((d, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  backgroundColor:
                    selectedDevice.name === d.name ? "orange" : "#2b2b2b",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  fontSize: adjustFontSize(d.name),
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  borderRadius: "10px",
                  cursor: "pointer",
                  margin: "5px 0px 5px 0px",
                }}
                key={i}
                onClick={() => setSelectedDevice(d)}
              >
                {d.name}
              </div>
            );
          })}
        </div>
        <div
          style={{
            backgroundColor: "#2b2b2b",
            width: "85%",
            borderRadius: "10px",
            minHeight: "65vh",
            margin: "5px 5px 5px 10px",
            padding: "20px",
            fontFamily: "inherit",
            fontSize: "25px",
          }}
        >
          <div style={{ borderBottom: "1px solid orange", padding: "10px" }}>
            Statistics
          </div>
          <div
            style={{
              height: "90%",
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loadingData ? (
              <CustomLoading />
            ) : stats.length === 0 ? (
              <div>NO DATA</div>
            ) : (
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart
                  width={500}
                  height={300}
                  data={stats}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 20, fill: "white" }}
                  />
                  <YAxis tick={{ fontSize: 20, fill: "white" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type={"monotone"}
                    dataKey={"temperature"}
                    stroke={"orange"}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
