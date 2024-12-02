// src/pages/RoomDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./RoomDetail.css";

function RoomDetail() {
  const { roomId } = useParams();

  // 房源數據
  const rooms = [
    {
      id: "1",
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
    },
    {
      id: "2",
      title: "Modern Loft with Stunning Views",
      description:
        "Experience the city like never before in this modern loft with breathtaking views. Perfect for small families or business travelers.",
      price: "$350 / hour",
      images: [
        "https://unsplash.com/photos/mockup-white-wall-in-loft-style-house-with-sofa-and-accessories-in-the-room3d-rendering-I1boZwONVbM",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
      host: {
        name: "Jane Smith",
        image: "https://images.unsplash.com/photo-1502767089025-6572583495e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.9,
      },
      amenities: ["Gym", "Pool", "Wi-Fi", "Elevator"],
    },
    {
      id: "3",
      title: "Rustic Cabin in the Mountains",
      description:
        "Escape the hustle and bustle with this charming rustic cabin surrounded by nature. Ideal for a peaceful retreat or an adventurous getaway.",
      price: "$150 / hour",
      images: [
        "https://images.unsplash.com/photo-1610878180933-0665d956771d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1541233349642-6e425fe6190e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
      host: {
        name: "Emily Brown",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.7,
      },
      amenities: ["Fireplace", "Hiking Trails", "Pet Friendly", "Wi-Fi"],
    }, {
      id: "4",
      title: "Luxurious Beachfront Villa",
      description:
        "Experience ultimate luxury in this beachfront villa, offering stunning ocean views and modern amenities. Perfect for families or group getaways.",
      price: "$500 / hour",
      images: [
        "https://images.unsplash.com/photo-1579785360543-34a5058fa168?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542822973-09fd57126b33?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1506748686214-0a56d8cfe776?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
      host: {
        name: "Sophia Johnson",
        image: "https://unsplash.com/photos/man-standing-near-white-wall-d1UPkiFd04A",
        rating: 4.9,
      },
      amenities: ["Pool", "Hot Tub", "Wi-Fi", "Beach Access", "Air Conditioning"],
    }
    
  ];

  // 將 roomId 和 room.id 都轉換為字串並比較
  const room = rooms.find((room) => room.id === String(roomId));

  if (!room) {
    return <div>Room not found</div>;
  }

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
