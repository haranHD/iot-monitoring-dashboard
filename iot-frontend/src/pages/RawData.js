import React, { useEffect, useState } from "react";
import "./RawData.css";

function RawData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://127.0.0.1:8000/raw-data")
        .then((res) => res.json())
        .then((result) => setData(result))
        .catch((err) => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1 className="title">IoT Raw Sensor Data</h1>
      <div className="stats">
      <div className="card">
        <h3>Total Records</h3>
        <p>{data.length}</p>
      </div>
    </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Voltage</th>
              <th>Current</th>
              <th>Pressure</th>
            </tr>
          </thead>
         <tbody>
  {data.map((item) => {
    const isAlert =
      item.temperature > 50 ||
      item.voltage > 240;

    return (
              <tr
                key={item.id}
                style={{
                  backgroundColor: isAlert ? "#ffdddd" : "white"
                }}
              >
              <td>{item.id}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
              <td>{item.voltage}</td>
              <td>{item.current}</td>
              <td>{item.pressure}</td>
            </tr>
          );
        })}
      </tbody>

        </table>
      </div>
    </div>
  );
}

export default RawData;
