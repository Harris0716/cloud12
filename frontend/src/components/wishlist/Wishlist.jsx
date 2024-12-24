
import React,{useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import Menu from "../Menu";
import "./Wishlist.css";
import HomeButton from "../HomeButton";


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

    const deleteClick = (jobId) => {
      const JwtToken = localStorage.getItem("token");
      fetch("http://localhost:8000/api/wishlist", {
        method: "DELETE", 
        headers: {
          "Authorization": `Bearer ${JwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobinfo_id: jobId
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.message === "Delete wishlist successfully!"){
          alert("已成功從心願清單移除"); 
          window.location.reload();
        }else{
          alert("移除失敗，請稍後再試");
        }
      })
      .catch(error => {
        // Error case
        alert("移除失敗，請稍後再試");
        console.error("Error:", error);
      });
    }
  
    return (
      <div className="container">
        <div className="header"><Menu /></div>
        <HomeButton /> <br/> <br/> <br/> <br/>
        <h1 className="title">我的心願清單</h1>
        <div className="listing-grid">
          {Array.isArray(listings) &&
          listings.map((listing) => (
            <div key={listing.jobinfo_id} className="listing-card">
              <Link to={`/job/${listing.jobinfo_id}`} >
                <img src={listing.cover_image} alt={listing.positions} className="listing-image"/>
                <div className="listing-info">
                  <h2 className="listing-title">{listing.positions}</h2>
                  <p className="listing-location">{listing.address}</p>
                </div>
              </Link>
              <button className="wishlist-btn" onClick={()=>deleteClick(listing.jobinfo_id)}>刪除</button>
            </div>
          ))}
        </div>
      </div>
    );
  
}

export default Wishlist;
