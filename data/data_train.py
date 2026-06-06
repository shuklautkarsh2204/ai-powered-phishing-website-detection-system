import pandas as pd
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import joblib

root = Path(__file__).resolve().parent.parent
csv_path = root / "phishing.csv"
output_path = root / "extension" / "phishing_model.onnx"

output_path.parent.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(csv_path)

X = df.drop("Result",axis=1)
featue_columns = X.columns.tolist()
print("Feature columns: ", featue_columns)
y = df["Result"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
model = RandomForestClassifier(
    n_estimators = 200, ## 200 trees
    random_state = 42
)

model.fit(X_train, y_train)

print("Model Accuracy: ", model.score(X_test, y_test)*100, "%")

## conversion to onnx format

initial_type = [
    ("float_input",
     FloatTensorType([None, X_train.shape[1]]))
]

onnx_model = convert_sklearn(
    model,
    initial_types=initial_type,
    options = {
        id(model): {'zipmap' : False}
    }
)

with open(output_path, "wb") as f:
    f.write(onnx_model.SerializeToString())
    
joblib.dump(model, root / "extension" / "phishing_model.pkl")    
joblib.dump(featue_columns, root / "extension" / "features.pkl")

print(f"skl -> onnx successful: {output_path}")
