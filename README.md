# 🧩 AI-Powered Phishing Website Detection System

An intelligent phishing detection system that combines **Machine Learning**, **Browser Extension Technology**, and **Domain Intelligence** to identify potentially malicious websites in real time.

The system analyzes website URLs, page structure, forms, redirects, embedded content, and domain reputation signals before classifying a website as **Legitimate** or **Potentially Phishing**.

---

# 🚀 Features

## Browser-Side Analysis

The extension extracts phishing indicators directly from the visited webpage, including:

- IP Address in URL
- URL Length
- URL Shortening Services
- Presence of '@' Symbol
- Double Slash Redirecting
- Prefix/Suffix Usage
- Number of Subdomains
- SSL State
- Favicon Source Analysis
- Port Analysis
- HTTPS Token Misuse
- Request URL Analysis
- URL of Anchor Analysis
- Links in Tags
- Server Form Handler (SFH)
- Submitting to Email Detection
- Redirect Detection
- Right Click Restriction Detection
- Iframe Detection
- Links Pointing to Page

## Backend Domain Intelligence

Additional security signals are computed on the backend:

- Domain Age Analysis (WHOIS-based)
- Feature Enrichment Before Prediction
- Confidence Scoring

---

# 🏗️ System Architecture

```text
Browser Extension
        │
        ▼
Feature Extraction
        │
        ▼
FastAPI Backend
        │
        ├── Domain Age Analysis
        ├── Feature Enrichment
        │
        ▼
Random Forest Model
        │
        ▼
Risk Prediction
        │
        ▼
Security Banner Display
```

---

# 🧠 Machine Learning Model

## Algorithm

- Random Forest Classifier
- 200 Decision Trees
- Scikit-Learn Implementation

## Dataset

The model is trained on a phishing website dataset containing:

- URL-based features
- HTML/DOM-based features
- Domain-based features
- Security-related indicators
- and many more (feature count was **30**)

## Performance

**Model Accuracy:** ~96.8%

> Accuracy may vary depending on dataset version and train/test split.

---

# 🛠️ Tech Stack

## Frontend

- JavaScript
- HTML
- CSS
- Microsoft Edge Extension (Manifest V3)

## Backend

- Python
- FastAPI
- NumPy
- Joblib

## Machine Learning

- Scikit-Learn
- Random Forest Classifier

## Domain Intelligence

- python-whois

---

# 📂 Project Structure

```text
ai-phishing-detection/

├── backend/
│   ├── app.py
│   ├── domain_age.py
│
├── extension/
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│
├── data/
│   ├── phishing.csv
│   ├── data_train.py
│
├── phishing_model.pkl
├── phishing_model.onnx
├── features.pkl
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/shuklautkarsh2204/ai-powered-phishing-website-detection-system.git

cd ai-powered-phishing-detection-system
```

## 2. Install Dependencies

```bash
pip install fastapi uvicorn scikit-learn pandas numpy joblib python-whois
```

## 3. Start Backend Server

```bash
cd backend

uvicorn app:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

## 4. Load Browser Extension

1. Open Edge or Chrome or any browser you use...
2. Navigate to:

```text
edge://extensions
OR
chrome://extensions
The goalis to reach the extension page.
```

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `extension` folder

---

# 🔍 Detection Pipeline

### Step 1

User visits a website.

### Step 2

The extension extracts phishing indicators from the page.

### Step 3

Features are sent to the FastAPI backend.

### Step 4

Backend enriches features using domain intelligence.

Example:

- Domain Age Analysis

### Step 5

Random Forest model performs classification.

### Step 6

A security banner is displayed showing:

- Risk Status
- Confidence Score
- Security Warnings

---

# 🖥️ User Interface

The extension displays a floating security banner.

## Safe Website

```text
🛡 AI Phishing Detector

Status: SAFE
Confidence: 98.4%
```

## Potential Phishing Website

```text
🛡 AI Phishing Detector

Status: HIGH RISK
Confidence: 93.1%
```

---

## 📈 Current Capabilities

- Analyzes 20+ phishing indicators
- Real-time browser scanning
- Machine learning classification (~96.8% accuracy)
- Domain age intelligence using WHOIS
- Confidence-based risk assessment
- Floating security banner alerts

---

# 🎯 Key Highlights

- Real-Time Website Analysis
- Browser Extension Integration
- Machine Learning Based Detection
- Domain Intelligence Enrichment
- Confidence-Based Predictions
- Modern Security Banner Interface
- Scalable Client-Server Architecture

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome.

Feel free to fork the repository and submit a pull request.

---

# 📜 License

This project is licensed under the MIT License.

---
## 👨‍💻 Author

Developed by **Utkarsh Shukla**  
AI/ML Enthusiast | Cybersecurity Learner | Python Developer

Focused on building practical machine learning and cybersecurity solutions with real-world applications.
