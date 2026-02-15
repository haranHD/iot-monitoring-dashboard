from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models import SensorData, Alert
from ..schemas import SensorDataResponse, AlertResponse

router = APIRouter()


# ✅ Get latest sensor readings (last 5)
@router.get("/latest", response_model=list[SensorDataResponse])
def get_latest_data(db: Session = Depends(get_db)):
    data = db.query(SensorData)\
             .order_by(SensorData.timestamp.desc())\
             .limit(5)\
             .all()
    return data


# ✅ Get all alerts
@router.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert)\
               .order_by(Alert.timestamp.desc())\
               .all()
    return alerts


# ✅ Get total message count
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_messages = db.query(func.count(SensorData.id)).scalar()
    total_alerts = db.query(func.count(Alert.id)).scalar()

    return {
        "total_messages": total_messages,
        "total_alerts": total_alerts
    }


# ✅ Raw data with pagination
@router.get("/raw-data", response_model=list[SensorDataResponse])
def get_raw_data(limit: int = 10, offset: int = 0, db: Session = Depends(get_db)):
    data = db.query(SensorData)\
             .order_by(SensorData.timestamp.desc())\
             .limit(limit)\
             .offset(offset)\
             .all()
    return data
