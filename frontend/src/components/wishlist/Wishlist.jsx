
import React,{useEffect, useState}from "react";
import "./Wishlist.css";
import { useNavigate } from 'react-router-dom';

// const listings_tmp = [
//   {
//     wishlist_id: 1,
//     job_title: "舒適的公寓 - 市中心",
//     job_address: "台北市中正區",
//     salary: "NT$2,000/晚",
//     url: "https://images.unsplash.com/photo-1730829807497-9c5b8c9c41c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
//   },
//   {
//     wishlist_id: 2,
//     job_title: "浪漫小屋 - 鄉村風格",
//     job_address: "宜蘭縣",
//     salary: "NT$1,500/晚",
//     url: "https://plus.unsplash.com/premium_photo-1730156312766-e5ab6e27a993?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
//   },
//   {
//     wishlist_id: 3,
//     job_title: "豪華別墅 - 海景房",
//     job_address: "墾丁",
//     salary: "NT$5,000/晚",
//     url: "https://images.unsplash.com/photo-1730544510231-d63fffb42aa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
//   },
//   {
//     wishlist_id: 4,
//     job_title: "私人招待所 - 總統房",
//     job_address: "台北",
//     salary: "NT$5,0000/晚",
//     url: "https://images.unsplash.com/photo-1730544510231-d63fffb42aa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
//   },
// ];

function Wishlist() {
    const [listings,setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch("http://localhost:8000/api/wishlist/1")  // 這裏來 綁定  user 的 id
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("後端數據:", data);
          setListings(data.data); 
        })
        .catch((error) => {
          console.error("獲取數據失敗:", error);
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
