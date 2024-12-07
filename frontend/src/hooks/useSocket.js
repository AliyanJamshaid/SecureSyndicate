import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (url) => {
  const [data, setData] = useState({ temperature: null, humidity: null });
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const socket = io(url);

    socket.on("updateData", (espData) => {
      setData((prevData) => {
        const shouldUpdate =
          prevData.temperature !== espData.temperature ||
          prevData.humidity !== espData.humidity;
        return shouldUpdate ? espData : prevData;
      });

      setHistoricalData((prevHistoricalData) => [
        ...prevHistoricalData.slice(-9),
        { ...espData, timestamp: new Date().toLocaleTimeString() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return { data, historicalData };
};

export default useSocket;
