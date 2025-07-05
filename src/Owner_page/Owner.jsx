import React, { useEffect, useState } from 'react';

const Owner = () => {
  const [image, setImage] = useState("");
  const [imageAmbiance, setImageAmbiance] = useState("");
  const [openings, setOpenings] = useState([]);

// NEW VERSION of covertToBase64
function covertToBase64(e,a) {
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

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); 
      if(a==1){
        setImage(compressedBase64);
      }
      else{
        setImageAmbiance(compressedBase64);
      }
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

    fetch("http://localhost:3001/uploadOpening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64: image }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Server responded:", data);
        getOpenings();
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }

  function handleUploadAmbiance() {
    if (!imageAmbiance) {
      alert("Please select an image first!");
      return;
    }

    fetch("http://localhost:3001/AddAmbiance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageAmbiance }),
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

  function getOpenings() {
    fetch("http://localhost:3001/getOpening")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Openings fetched:", data);
        setOpenings(data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  useEffect(() => {
    getOpenings();
  }, []);

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={(e) => covertToBase64(e, 1)} />
      <br /><br />
      {image && (
        <img src={image} alt="Preview" width={300} height="auto" />
      )}
      <br />
      <button onClick={handleUpload}>Upload</button>

      <h2>Saved Openings</h2>
      {openings.map((data, index) => (
        <img
          key={index}
          src={data.image}
          alt={`opening-${index}`}
          width={100}
          height="auto"
          style={{ margin: '10px' }}
        />
      ))}
      <br />
      <h2>Add ambiance</h2>
      
      <input type="file" accept="image/*" onChange={(e) => covertToBase64(e, 2)} />
      <br /><br />
      {imageAmbiance && (
        <img src={imageAmbiance} alt="Preview" width={300} height="auto" />
      )}
      <br />
      <button onClick={handleUploadAmbiance}>Upload</button>
    </div>
  );
};

export default Owner;
