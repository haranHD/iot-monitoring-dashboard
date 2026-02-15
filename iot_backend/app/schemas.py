from pydantic import BaseModel
from datetime import datetime

class SensorDataResponse(BaseModel):
    id: int
    topic: str
    temperature: float | None
    humidity: float | None
    voltage: float | None
    current: float | None
    pressure: float | None
    timestamp: datetime

    class Config:
        orm_mode = True


class AlertResponse(BaseModel):
    id: int
    topic: str
    violated_keys: str
    temperature: float | None
    humidity: float | None
    voltage: float | None
    current: float | None
    pressure: float | None
    timestamp: datetime

    class Config:
        orm_mode = True

