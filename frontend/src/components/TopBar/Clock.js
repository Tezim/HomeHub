import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const timeString = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "0 8px 0px 8px",
      }}
    >
      <div style={{ color: "white", fontSize: "50px" }}>{timeString}</div>
    </div>
  );
};

export default Clock;
