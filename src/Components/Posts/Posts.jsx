import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {PostContext} from '../../store/PostContext';

function Posts() {
  const FirebaseApp = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const {setPostDetails}=useContext(PostContext);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(FirebaseApp.firestore, "products"));
        const allProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fethching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div
              className="card"
              onClick={()=>{
                setPostDetails(product);
                navigate('/view');
              }}
              key={product.id}>
                {console.log("Product image URL:", product.imageUrl)}
              <div className="favorite">
                <Heart/>
              </div>
              <div className="image">
                <img src={product.imageUrl||null} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt.toDate().toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
