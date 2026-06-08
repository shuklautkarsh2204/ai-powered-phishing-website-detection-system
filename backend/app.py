from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel
from domain_age import age_of_domain_feature

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
    domain: str

@app.post("/predict")
def predict(data: Features):

    features = data.features.copy()
    features[23] = age_of_domain_feature(data.domain)
    
    print("Domain:", data.domain)
    print("Age Feature: ", features[23])
    
    x = np.array(
        features,
        dtype=np.float32
    ).reshape(1, -1)

    prediction = model.predict(x)[0]
    
    probs = model.predict_proba(x)[0]
    confidence = float(
        max(probs)
    )

    print("Prediction:")
    print(prediction)
    
    print("Confidence:")
    print(confidence)

    return {
        "prediction": int(prediction),
        "confidence": confidence
    }