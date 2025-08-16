import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthContext } from './store/Context';
import { FirebaseContext } from './store/Context.jsx';
import { onAuthStateChanged } from "firebase/auth"
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from  './store/PostContext.jsx';
function App() {
  const {setUser}=useContext(AuthContext);
  const FirebaseApp = useContext(FirebaseContext);
  useEffect(()=>{
    const auth=FirebaseApp.auth;
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      setUser(user);
    });
    return()=>unsubscribe();
    
  },[]);
  return (
  <Post>
    <Router>
 <div>

  <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<ViewPost/>}/>
  </Routes>
    </div>

    </Router>
  </Post>
   
  );
}

export default App;
