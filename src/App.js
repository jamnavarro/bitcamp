import React, { useState } from "react";
import './App.css';

function App() {
  const [imageURL, setImageURL] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const identifyImage = () => {
      // MODEL HERE
  }

  return (
    <div className="main">
      <h1>Title here</h1>
      
      <div className="image_container">
        {imageURL && <img className="image" src={imageURL} alt="Uploaded" />}
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <button className="button" onClick={identifyImage}>Identify</button>
    </div>
  );
}

export default App;
