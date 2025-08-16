import React, { useContext, } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../../../olx-vite-clone/src/assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FirebaseContext } from '../../store/Context';


export default function Header() {
  const Navigate=useNavigate();
  const firebaseApp = useContext(FirebaseContext);
  const auth = firebaseApp.auth;
  const handleLogOut = () => {
    signOut(auth).then(() => {
      console.log("user signed out successfully");
      Navigate('/login');
    }).catch((error) => {
      console.error("Error signing out:", error.message);
    })
  }
  const { user } = useContext(AuthContext);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          {user ? (
            <>
              <div className="userMenu">
                <span>Welcome,{user.displayName}</span>
                <button onClick={handleLogOut}>Logout</button>
              </div>
            </>
          ) : (<Link to='/login'>
            <span>Login</span>
          </Link>
          )}
          {/* <hr /> */}
        </div>

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}


