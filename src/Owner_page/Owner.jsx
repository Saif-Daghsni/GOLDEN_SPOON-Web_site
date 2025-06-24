import { useState } from 'react';
import axios from 'axios';


const Owner = () => {
    const [file, setFile] = useState ();

    // eslint-disable-next-line no-unused-vars
    const handleUpload = (e) => {
        const fromdata = new FormData();
        fromdata.append("file", file);
        axios.post("http://localhost:3001/upload", fromdata)
        .then(res => console.log(res))
        .catch(err => console.error(err))


    }
  return (
    <div>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Owner