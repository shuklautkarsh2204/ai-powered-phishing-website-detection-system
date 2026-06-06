from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = joblib.load('phishing_model.pkl')

class Features(BaseModel):
    features: list
    
@app.post("/predict")
def predict(data: Features):

    x = np.array(
        data.features,
        dtype=np.float32
    ).reshape(1, -1)

    prediction = model.predict(x)[0]

    print("\nReceived Features:")
    print(data.features)

    print("Prediction:")
    print(prediction)

    return {
        "prediction": int(prediction),
        "features": data.features
    }