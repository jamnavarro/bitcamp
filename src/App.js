import React, { useState } from "react";
import * as tf from '@tensorflow/tfjs';
import './App.css';

async function runModel() {
  // const model = await tf.loadGraphModel( /* add json file here! */)
}



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
      // MODEL HERE
      // this is for example, delete later
      const identifiedName = await classifyImage(imageURL);
      setIdentifiedPerson(identifiedName);
      // end example
  }

  // this is for example, delete later
  const classifyImage = async () => {
    const names = ["Chaewon", "Sakura", "Yunjin", "Kazuha", "Eunchae"];
    return names[Math.floor(Math.random() * names.length)];
  };
  // end example

  return (
    <div className="main">
      <img className="image logo" src="logo.png" alt="Le Sserafim logo"></img>
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
