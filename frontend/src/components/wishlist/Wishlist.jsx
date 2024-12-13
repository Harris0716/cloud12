
import React,{useEffect, useState}from "react";
import "./Wishlist.css";
import { useNavigate } from 'react-router-dom';


function Wishlist() {
    const [listings,setListings] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
      const JwtToken = localStorage.getItem("token"); 
      const user = localStorage.getItem("username")

      if (!JwtToken || !user) {
        navigate("/login");  // 如果沒有 token，重定向至登入頁
        return;
      }

      fetch("http://localhost:8000/api/wishlist", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${JwtToken}`, // 確保這裡有正確的 JWT Token
          "Content-Type": "application/json"
        }
      }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setListings(data.data); 
        })
        .catch((error) => {
          console.error("wishlist 獲取數據失敗:", error);
        });
    }, []);
    

    const handleClick = (jobId) => {
      // 當點擊工作時，導航到對應的工作詳細頁面
      navigate(`/job/${jobId}`);
    };
  
    return (
      <div className="container">
        <h1 className="title">我的心願清單</h1>
        <div className="listing-grid">
          {Array.isArray(listings) &&
          listings.map((listing) => (
            <div key={listing.wishlist_id} className="listing-card" onClick={() => handleClick(listing.jobinfo_id)}>
              <img src={listing.url} alt={listing.job_title} className="listing-image"/>
              <div className="listing-info">
                <h2 className="listing-title">{listing.job_title}</h2>
                <p className="listing-location">{listing.job_address}</p>
                <p className="listing-price">{listing.salary} 元</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
}

export default Wishlist;
