import React, { useState } from 'react';

const AddAmbiance = () => {

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


function covertToBase64(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      // ➜ This is the NEW PART:
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800; // or whatever you want
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality JPEG
      setImage(compressedBase64);
      console.log("✅ Image resized & compressed");
    };
  };

  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
}


  function handleUpload() {
    
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    fetch("http://localhost:3001/addAmbiance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        image: image 
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Server responded:", data);
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }


  return (
    <div>
      <h2>Upload an Informations</h2>
        <label htmlFor="">Name of the plate</label> <br /><br />
        <input type="text" placeholder='Enter the name of the plate' onChange={(e) => setName(e.target.value)} /> <br /><br />
        <label htmlFor="">description of the plate</label> <br />
        <textarea type="text" placeholder='Enter the description of the plate' onChange={(e) => setDescription(e.target.value)} /> <br /><br />
        <label htmlFor="">Price of the plate</label> <br />
        <input type="number" placeholder='Enter the price of the plate' onChange={(e) => setPrice(e.target.value)} /> <br /><br />
        <label htmlFor="">the photo of the plate</label> <br /> <br />

      <input type="file" accept="image/*" onChange={covertToBase64} />
      <br /><br />
      {image && (
        <img src={image} alt="Preview" width={300} height="auto" />
      )}
      <br />
      <button onClick={handleUpload}>Upload</button>


    </div>
  );
};


export default AddAmbiance