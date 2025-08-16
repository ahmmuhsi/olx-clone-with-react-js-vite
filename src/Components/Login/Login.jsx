import React, { use } from 'react';

import Logo from '../../assets/olx-logo.png';
import './Login.css';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate,Link} from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseApp = useContext(FirebaseContext);
  const auth = firebaseApp.auth;
  const db = firebaseApp.firestore;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
      console.log("Signned in:",userCredentials.user.email);
    }).then(()=>{
      navigate('/');
    }).catch((error)=>{
      console.error("login error:", error.message);
      alert("Invalid email or password | invalid credentials or login failed ");
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
