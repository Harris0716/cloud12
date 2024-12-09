import React, { useState, useEffect } from 'react';
import './Notification.css';

function Notification() {
  const bellIconURL = "https://cdn-icons-png.flaticon.com/512/3602/3602123.png";
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // 模擬通知數據，實際應從後端 API 獲取
    setNotifications([
      { id: 1, message: "您的訂單已成功送達" },
      { id: 2, message: "新的活動即將開始，快來參加吧！" },
      { id: 3, message: "您有一則新的訊息" },
    ]);
  }, []);

  return (
    <div className="notification">
      <button onClick={toggleNotification} className="notification-button">
        <img src={bellIconURL} alt="Notification Bell" className="icon" />
      </button>
      {isOpen && (
        <ul className="notification-dropdown">
          {notifications.length === 0 ? (
            <li className="notification-item">目前沒有新通知</li>
          ) : (
            notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                {notification.message}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Notification;
