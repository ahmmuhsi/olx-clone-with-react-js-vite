import React from 'react';

import olxLogo from '../../assets/olx-logo.png';
import './Signup.css';
import { useState,useContext } from 'react';
import  {FirebaseContext}  from '../../store/Context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import { updateProfile } from 'firebase/auth'
import {collection, addDoc} from 'firebase/firestore';

export default function Signup() {
const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const firebaseApp = useContext(FirebaseContext);
  const auth = firebaseApp.auth;
  const navigate=useNavigate();
  const db= firebaseApp.firestore;

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user,{
          displayName:username,
        })
          .then(() => {
            addDoc(collection(db,'users'),{
              id:result.user.uid,
              username:username,
              phone:phone,
            }).then(()=>{
              navigate('/login');
            })
            console.log('User signed up successfully!');
          })
          .catch((error) => {
            console.error('Error updating profile:', error.message);
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
      });
  };


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={olxLogo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            id="ffname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="llname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
