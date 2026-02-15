from fastapi import FastAPI
from .database import engine
from .models import Base
from .mqtt_client import start_mqtt
from .routes.data_routes import router
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime
from .database import SessionLocal
from .models import SensorData
from .models import Alert



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later you can restrict to localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

@app.on_event("startup")
def startup_event():
    start_mqtt()

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "IoT Backend Running"}

@app.get("/simulate")
def simulate():
    db = SessionLocal()

    new_data = {
        "topic": "sensor/test",
        "temperature": round(random.uniform(20, 40), 2),
        "humidity": round(random.uniform(40, 80), 2),
        "voltage": round(random.uniform(210, 240), 2),
        "current": round(random.uniform(1, 5), 2),
        "pressure": round(random.uniform(900, 1100), 2),
        "timestamp": datetime.utcnow()
    }

    # Insert raw data
    sensor_entry = SensorData(**new_data)
    db.add(sensor_entry)
    db.commit()

    # 🔥 Threshold checking
    thresholds = {
        "temperature": 35,
        "humidity": 75,
        "voltage": 230,
        "current": 4,
        "pressure": 1050
    }

    violated = []

    for key, limit in thresholds.items():
        if new_data[key] > limit:
            violated.append(key)

    # If violation exists → create alert
    if violated:
        alert_entry = Alert(
            topic=new_data["topic"],
            violated_keys=",".join(violated),
            temperature=new_data["temperature"],
            humidity=new_data["humidity"],
            voltage=new_data["voltage"],
            current=new_data["current"],
            pressure=new_data["pressure"]
        )

        db.add(alert_entry)
        db.commit()

    db.close()

    return {"message": "Data inserted successfully"}

