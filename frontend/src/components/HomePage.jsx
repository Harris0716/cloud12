
import React,{useState}from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Menu from "./Menu";

const listings = [
  {
    id: 1,
    title: "舒適的公寓 - 市中心",
    location: "台北市中正區",
    price: "NT$2,000/晚",
    image: "https://images.unsplash.com/photo-1730829807497-9c5b8c9c41c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  },
  {
    id: 2,
    title: "浪漫小屋 - 鄉村風格",
    location: "宜蘭縣",
    price: "NT$1,500/晚",
    image: "https://plus.unsplash.com/premium_photo-1730156312766-e5ab6e27a993?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  },
  {
    id: 3,
    title: "豪華別墅 - 海景房",
    location: "墾丁",
    price: "NT$5,000/晚",
    image: "https://images.unsplash.com/photo-1730544510231-d63fffb42aa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  },
  {
    id: 4,
    title: "私人招待所 - 總統房",
    location: "台北",
    price: "NT$5,0000/晚",
    image: "https://images.unsplash.com/photo-1730544510231-d63fffb42aa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  },
];

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filteredListings = listings.filter((listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="container">
        <div className="homepage">
          <div className="header">
            <Menu />
          </div>
          <br /><br /><br />
          <h1 className="title">熱門房源</h1>
          {/* 搜尋欄位 */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜尋房源..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        </div>
        {/* 房源列表 */}
        <div className="listing-grid">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <img src={listing.image} alt={listing.title} className="listing-image" />
              <div className="listing-info">
                <h2 className="listing-title">{listing.title}</h2>
                <p className="listing-location">{listing.location}</p>
                <p className="listing-price">{listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
}

export default HomePage;
