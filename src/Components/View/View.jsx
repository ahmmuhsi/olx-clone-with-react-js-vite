import React, { useEffect, useState, useContext } from "react";

import "./View.css";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const FirebaseApp = useContext(FirebaseContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!postDetails) {
      navigate("/");
      return;
    }
    const getUserDetails = async () => {
      try {
        const userId = postDetails.userId;
        const userRef = doc(FirebaseApp.firestore, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        }
      } catch (error) {
        console.error("Error fecthing user detaiils:", error);
      }
    };
    getUserDetails();
  }, [postDetails, FirebaseApp.firestore, navigate]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl || "../../../Images/fallback.jpg"}
          alt={postDetails?.name || "product"}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price}</p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>
            {postDetails?.createdAt?.toDate().toDateString() || "unknown date"}
          </span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || "no name available"}</p>
          <p>{userDetails?.phone || "No contact info"}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
