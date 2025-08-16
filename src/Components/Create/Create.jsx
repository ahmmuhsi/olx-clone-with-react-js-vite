import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {collection,addDoc} from 'firebase/firestore';

 const Create = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploading,setUploading]=useState(false);
  const [imageUrl, setImageUrl]=useState("");
  const  FirebaseApp=useContext(FirebaseContext);
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
const resetForm=()=>{
  setName("");
       setCategory("");
       setPrice("");
       setImage(null);
       setImageUrl("");
};
const handleSubmit= async (e)=>{
  e.preventDefault();
  if(!name||!category||!price||!image){
    alert("Please fill out all  fields and select an image.");
    setUploading(false);
    return;
  }
    

  setUploading(true);

  const formData =new FormData();
  formData.append("file",image);
  formData.append("upload_preset", "olx-upload-preset");
  try{
    const response=await axios.post("https://api.cloudinary.com/v1_1/ds7fjefqb/image/upload",
        formData
      );
      const uploadedImageUrl=(response.data.secure_url);
      setImageUrl(uploadedImageUrl);
      console.log("image uploaded:",response.data.secure_url);
      await addDoc(collection(FirebaseApp.firestore,"products"),{
        name,
        category,
        price,
        imageUrl:uploadedImageUrl,
        userId:user.uid,
        createdAt:new Date()
      });
      resetForm();
      navigate('/');
  }catch(error){
    console.log("upload failed:",error.message);
  }finally{
    setUploading(false);
  }

};

  return (
    <Fragment>
      <Header />
      <div className="cardd">
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input"
             type="number"
             value={price}
              id="fname" 
               onChange={(e)=>setPrice(e.target.value)}
              name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button type='submit' disabled={uploading} className="uploadBtn">{uploading?"Uploading...":"upload and Submit"}</button>   
          </form>
        </div>
      </div>

    </Fragment>
  );
};

export default Create;