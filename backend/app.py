from flask import Flask, request, jsonify
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image

app = Flask(__name__)

# redefined CNN
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.layer1 = nn.Sequential(
            nn.Conv2d(3, 8, 3, padding=1),
            nn.BatchNorm2d(8),
            nn.ReLU(),
            nn.MaxPool2d(2, 2))
        self.layer2 = nn.Sequential(
            nn.Conv2d(8, 16, 3, padding=1),
            nn.BatchNorm2d(16),
            nn.ReLU(),
            nn.MaxPool2d(2, 2))
        self.layer3 = nn.Sequential(
            nn.Conv2d(16, 32, 3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Dropout(0.5))
        self.fc1 = nn.Sequential(
            nn.Linear(32 * 60 * 60, 128),
            nn.ReLU())
        self.fc2 = nn.Sequential(
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Dropout(0.5))
        self.fc3 = nn.Sequential(
            nn.Linear(64, 5))

    def forward(self, x):
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = self.fc2(x)
        x = self.fc3(x)
        return x


preprocess = transforms.Compose([
    transforms.Resize((480, 480)),
    transforms.ToTensor()
])

class_names = ["Chaewon", "Sakura", "Yunjin", "Kazuha", "Eunchae"]

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})
    
    file = request.files['file']
    img = Image.open(file).convert('RGB')
    img = preprocess(img)
    img = img.unsqueeze(0)

    model = CNN()
    model.load_state_dict(torch.load('CNN4.pth', map_location=torch.device('cpu')))
    model.eval()

    with torch.no_grad():
        output = model(img)
    
    predicted_class_index = torch.argmax(output, dim=1).item()
    
    predicted_class_name = class_names[predicted_class_index]
    
    return jsonify({'output': predicted_class_name})

if __name__ == '__main__':
    app.run(debug=True)