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

  // const identifyImage = async () => {
  //   const formData = new FormData();
  //   formData.append('file', imageURL);
    
  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/predict', {
  //       method: 'POST',
  //       body: formData
  //     });
      
  //     if (!response.ok) {
  //       throw new Error("couldn't identify image");
  //     }

  //     const data = await response.json();
  //     setIdentifiedPerson(data.output);
  //   } catch (error) {
  //     console.error("error identifying image: ", error);
  //   }
  // }

  const identifyImage = async () => {
    try {
      const identifiedName = await classifyImage(); // Use the classifyImage function
      setIdentifiedPerson(identifiedName);
    } catch (error) {
      console.error("error identifying image: ", error);
    }
  };

  const classifyImage = async () => {
    const names = ["Chaewon", "Sakura", "Yunjin", "Kazuha", "Eunchae"];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * names.length);
        resolve(names[randomIndex]);
      }, 1000);
    });
  };

  return (
    <div className="main">
    {/* <img className="image logo" src="logo.png" alt="Le Sserafim logo" /> */}
      <h1>LE SSERAFIND</h1>
      <p>Upload an image to identify a member of Le Sserafim.</p>
      
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
