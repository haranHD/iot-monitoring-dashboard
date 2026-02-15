# IoT Monitoring Dashboard 🚀

This project is a Full Stack IoT Monitoring System that I developed as part of a technical assessment.

The system collects sensor data, stores it in a MySQL database, detects threshold violations, and displays the data in a live dashboard built using React.

The entire application is containerized using Docker Compose.

---

## 🔧 Tech Stack Used

### Backend
- FastAPI
- SQLAlchemy
- PyMySQL
- MySQL
- Pydantic

### Frontend
- React.js
- Axios
- CSS

### DevOps
- Docker
- Docker Compose

---

## 📊 Features Implemented

- Store sensor readings in MySQL database
- REST APIs for:
  - Latest sensor data
  - Total statistics
  - Alerts
  - Raw data with pagination
- Automatic threshold violation detection
- Alert logging
- Live dashboard with auto-refresh
- Conditional row highlighting for critical values
- Fully Dockerized setup (Backend + Frontend + MySQL)

---

## 🚨 Alert Logic

If any of the following exceed defined thresholds:
- Temperature
- Humidity
- Voltage
- Current
- Pressure

An alert record is automatically created and stored in the alerts table.

---

## 🐳 Running the Project with Docker

Make sure Docker is installed.

From project root:

```bash
docker-compose up --build
