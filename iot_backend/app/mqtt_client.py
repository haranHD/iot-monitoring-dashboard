import json
import paho.mqtt.client as mqtt
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import SensorData

BROKER = "localhost"
PORT = 1883

TOPICS = [
    "factory/device1",
    "factory/device2",
    "factory/device3",
    "factory/device4",
    "factory/device5"
]
THRESHOLDS = {
    "temperature": 50,
    "humidity": 80,
    "voltage": 240,
    "current": 10,
    "pressure": 100
}


def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT Broker")
    for topic in TOPICS:
        client.subscribe(topic)

def on_message(client, userdata, msg):
    print(f"Received message from {msg.topic}")
    data = json.loads(msg.payload.decode())

    db: Session = SessionLocal()

    sensor_entry = SensorData(
        topic=msg.topic,
        temperature=data.get("temperature"),
        humidity=data.get("humidity"),
        voltage=data.get("voltage"),
        current=data.get("current"),
        pressure=data.get("pressure"),
    )

    db.add(sensor_entry)
    db.commit()
    db.close()

def start_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    try:
        client.connect(BROKER, PORT)
        client.loop_start()
        print("MQTT started successfully")
    except Exception as e:
        print("MQTT Connection Failed:", e)

