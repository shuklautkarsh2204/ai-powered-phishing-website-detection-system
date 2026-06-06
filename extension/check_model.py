import onnxruntime as ort

session = ort.InferenceSession("extension/phishing_model.onnx")

print("Inputs:")
for input in session.get_inputs():
    print(f" {input.name}: {input.shape} {input.type}")

print("\nOutputs:")
for out in session.get_outputs():
    print(f" {out.name}: {out.shape} {out.type}")
          