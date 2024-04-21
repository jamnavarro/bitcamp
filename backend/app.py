from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image

app = Flask(__name__)

model = torch.load('CNN.pth')
model.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})
    
    image = request.files['image']
    img = Image.open(image).convert('RGB')
    img = preprocess(img)
    img = img.unsqueeze(0)

    with torch.no_grad():
        output = model(img)
    
    predicted_class_index = torch.argmax(output).item()
    class_names = ["Chaewon", "Sakura", "Yunjin", "Kazuha", "Eunchae"]
    predicted_class_name = class_names[predicted_class_index]
    
    return jsonify({'predicted_person': predicted_class_name})

if __name__ == '__main__':
    app.run(debug=True)