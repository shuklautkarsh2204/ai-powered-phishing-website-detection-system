import requests

url = "http://127.0.0.1:8000/predict"

data = {
    "features": [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]  # example feature list
}

res = requests.post(url, json=data)

print(res.json())