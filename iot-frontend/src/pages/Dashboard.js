import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [latestData, setLatestData] = useState([]);

  useEffect(() => {
  fetchStats();
  fetchLatest();

  const interval = setInterval(() => {
    fetchStats();
    fetchLatest();
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
}, []);


  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchLatest = async () => {
    try {
      const res = await API.get("/latest");
      setLatestData(res.data);
    } catch (error) {
      console.error("Error fetching latest data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ padding: "20px", background: "#eee", borderRadius: "8px" }}>
          <h3>Total Messages</h3>
          <p>{stats.total_messages || 0}</p>
        </div>

        <div style={{ padding: "20px", background: "#eee", borderRadius: "8px" }}>
          <h3>Total Alerts</h3>
          <p>{stats.total_alerts || 0}</p>
        </div>
      </div>

      <h2>Latest Sensor Readings</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Temp</th>
            <th>Humidity</th>
            <th>Voltage</th>
            <th>Current</th>
            <th>Pressure</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {latestData.map((item) => (
            <tr
                key={item.id}
                style={{
                  backgroundColor:
                    item.temperature > 35 || item.voltage > 230
                      ? "#ffcccc"
                      : "white",
                }}
              >

              <td>{item.topic}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
              <td>{item.voltage}</td>
              <td>{item.current}</td>
              <td>{item.pressure}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
