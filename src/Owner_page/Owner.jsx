import React, { useEffect } from 'react';

const Owner = () => {

  const [image, setImage] = React.useState("") ;
  const [openings, setOpenings] = React.useState([]) ;

  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log("Image converted successuflly");
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };  
  }

function handleUpload() {
fetch("http://localhost:3001/uploadOpening", {
  method: "POST",
  crossDomain: true ,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({ base64: image })
})
  .then(res => {
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return res.json();
  })
  .then(data => console.log("✅ Server responded:", data))
  .catch(err => console.error("❌ Error:", err));

}

  function getOpenings() {
    fetch("http://localhost:3001/getOpening", {
      method: "GET",
      
    }).then((res)=> res.json()).then((data)=> {
      console.log(data)
      setOpenings(data.data)
    })
  }    

  useEffect(() => {
    getOpenings();
  }, []);

  return (
    <div>
        <input type="file" onChange={covertToBase64}/>
        <br />
        {image=="" || image==null ?"" : 
        <img src={image} width={300} height={300} alt="" /> }

        
        <button onClick={handleUpload}>Upload</button>

        {openings.map(data =>{
          return (
            <img width={100} height={100} src={data.image}/>
          )
        })}
    </div>
  )
}

export default Owner
