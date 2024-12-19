import React, { useState } from 'react';
import './LandlordPage.css';

const LandlordPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: '陽光背包客棧',
      address: '台北市大安區和平東路一段',
      workHours: 20,
      rooms: {
        total: 5,
        available: 3
      },
      workTypes: ['清潔工作', '櫃檯接待', '簡單維護'],
      status: 'active'
    },
    {
      id: 2,
      name: '山中小屋',
      address: '南投縣魚池鄉日月村',
      workHours: 25,
      rooms: {
        total: 3,
        available: 1
      },
      workTypes: ['園藝整理', '房務清潔'],
      status: 'active'
    }
  ]);

  const [newRoom, setNewRoom] = useState({
    name: '',
    address: '',
    workHours: '',
    totalRooms: '',
    workTypes: [],
  });

  const handleAddRoom = () => {
    const roomToAdd = {
      ...newRoom,
      id: rooms.length + 1,
      rooms: {
        total: parseInt(newRoom.totalRooms),
        available: parseInt(newRoom.totalRooms)
      },
      status: 'active'
    };
    
    setRooms([...rooms, roomToAdd]);
    setShowAddModal(false);
    setNewRoom({
      name: '',
      address: '',
      workHours: '',
      totalRooms: '',
      workTypes: [],
    });
  };

  return (
    <div className="room-management">
      <div className="room-management__header">
        <h1 className="room-management__title">房源管理</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="room-management__add-btn"
        >
          <span>＋</span>
          新增房源
        </button>
      </div>

      <div className="room-management__list">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-card__header">
              <div>
                <div className="room-card__title">
                  <span className="room-card__icon">🏠</span>
                  <h2>{room.name}</h2>
                </div>
                <p className="room-card__address">{room.address}</p>
              </div>
              <div className="room-card__actions">
                <button
                  onClick={() => setEditingRoom(room)}
                  className="room-card__action-btn"
                  title="編輯"
                >
                  ✎
                </button>
                <button 
                  className="room-card__action-btn"
                  title="刪除"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="room-card__info">
              <div className="room-card__stat">
                <p className="room-card__label">每週工作時數</p>
                <p className="room-card__value">{room.workHours} 小時</p>
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">房間狀態</p>
                <p className="room-card__value">
                  可用 {room.rooms.available} / 總共 {room.rooms.total}
                </p>
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">工作類型</p>
                <div className="room-card__tags">
                  {room.workTypes.map((type, index) => (
                    <span
                      key={index}
                      className="room-card__tag"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__header">
              <h2 className="modal__title">新增房源</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="modal__close"
              >
                ×
              </button>
            </div>
            
            <div className="modal__content">
              <div className="form-field">
                <label className="form-field__label">房源名稱</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  className="form-field__input"
                />
              </div>

              <div className="form-field">
                <label className="form-field__label">地址</label>
                <input
                  type="text"
                  value={newRoom.address}
                  onChange={(e) => setNewRoom({...newRoom, address: e.target.value})}
                  className="form-field__input"
                />
              </div>

              <div className="form-field">
                <label className="form-field__label">每週工作時數</label>
                <input
                  type="number"
                  value={newRoom.workHours}
                  onChange={(e) => setNewRoom({...newRoom, workHours: e.target.value})}
                  className="form-field__input"
                />
              </div>

              <div className="form-field">
                <label className="form-field__label">房間數量</label>
                <input
                  type="number"
                  value={newRoom.totalRooms}
                  onChange={(e) => setNewRoom({...newRoom, totalRooms: e.target.value})}
                  className="form-field__input"
                />
              </div>
            </div>

            <div className="modal__footer">
              <button
                onClick={() => setShowAddModal(false)}
                className="modal__btn modal__btn--cancel"
              >
                取消
              </button>
              <button
                onClick={handleAddRoom}
                className="modal__btn modal__btn--confirm"
              >
                新增
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordPage;