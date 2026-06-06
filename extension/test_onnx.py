import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("extension/phishing_model.onnx")

print("Inputs:")
for input in session.get_inputs():
    print(f" {input.name}: {input.shape} {input.type}")

print("\nOutputs:")
for out in session.get_outputs():
    print(f" {out.name}: {out.shape} {out.type}")
    
x = np.zeros((1,30), dtype=np.float32)

result = session.run(None, {
    session.get_inputs()[0].name: x
})

print("\nPrediction:", result)        