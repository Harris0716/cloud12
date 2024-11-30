// src/pages/RoomDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./RoomDetail.css";
// import { listings } from './HomePage';

function RoomDetail() {
  const room = {
    title: "Cozy Apartment in the City Center",
    description:
      "This cozy apartment is located in the heart of the city, offering easy access to all major attractions. Ideal for solo travelers or couples.",
    price: "$230 / hour",
    images: [
      "https://images.unsplash.com/photo-1730710144542-4578a09aad7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://plus.unsplash.com/premium_photo-1670984935550-5ce2e220977a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1730812393789-a7d15960029d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
    ],
    host: {
      name: "John Doe",
      image: "https://plus.unsplash.com/premium_photo-1730156312766-e5ab6e27a993?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      rating: 4.8,
    },
    amenities: ["Wi-Fi", "Air Conditioning", "Kitchen", "Washer", "Parking"],
  };

  return (
    <div className="room-detail">
      <div className="room-images">
        {room.images.map((image, index) => (
          <img key={index} src={image} alt={`Room ${index + 1}`} />
        ))}
      </div>
      <div className="room-info-container">
        <div className="room-info">
          <h1 className="room-title">{room.title}</h1>
          <p className="room-description">{room.description}</p>
          <div className="room-price">{room.price}</div>

          <div className="host-info">
            <div className="host-avatar">
              <img src={room.host.image} alt="Host" />
            </div>
            <div className="host-details">
              <h3>Hosted by {room.host.name}</h3>
              <div className="host-rating">Rating: {room.host.rating} ★</div>
            </div>
          </div>

          <div className="room-amenities">
            <h3>Amenities</h3>
            <ul>
              {room.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="booking-form">
            <h3>Book This Room</h3>
            <form>
              <label htmlFor="check-in">Check-in</label>
              <input type="date" id="check-in" name="check-in" required />

              <label htmlFor="check-out">Check-out</label>
              <input type="date" id="check-out" name="check-out" required />

              <button type="submit">Reserve Now</button>
            </form>
          </div>
      </div>
      
    </div>
  );
}

export default RoomDetail;
