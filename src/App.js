import React, { useState } from "react";
import './App.css';

function App() {
  const [imageURL, setImageURL] = useState(null);
  const [identifiedPerson, setIdentifiedPerson] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const identifyImage = async () => {
    const formData = new FormData();
    formData.append('image', imageURL);
    
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    setIdentifiedPerson(data.predicted_person);
  }

  // const classifyImage = async () => {
  //   const names = ["Chaewon", "Sakura", "Yunjin", "Kazuha", "Eunchae"];
  //   return names[Math.floor(Math.random() * names.length)];
  // };

  return (
    <div className="main">
      {/* <img className="image logo" src="logo.png" alt="Le Sserafim logo"></img> */}
      <h1>LE SSERAFIND</h1>
      <p>upload an image to identify a member of Le Sserafim.</p>
      
      <div className="image_container">
        {imageURL && <img className="image upload" src={imageURL} alt="Uploaded" />}
      </div>
      
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <button className="button" onClick={identifyImage}>Identify</button>

      {identifiedPerson && (<p>This is {identifiedPerson}!</p>)}
    </div>
  );
}

export default App;
