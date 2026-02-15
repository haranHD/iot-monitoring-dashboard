import { useEffect, useState } from "react";
import API from "../services/api";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(() => {
      fetchAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/latest");
      
      const abnormalData = res.data.filter(
        (item) => item.temperature > 35 || item.voltage > 230
      );

      setAlerts(abnormalData);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚠ Alerts</h1>

      {alerts.length === 0 ? (
        <p>No alerts right now</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Temperature</th>
              <th>Voltage</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((item) => (
              <tr key={item.id} style={{ backgroundColor: "#ffcccc" }}>
                <td>{item.topic}</td>
                <td>{item.temperature}</td>
                <td>{item.voltage}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Alerts;
