# Wishlist

## GET 

`http://localhost:8000/api/wishlist/:user_id`

## POST

`http://localhost:8000/api/wishlist`
```json
{
    "user_id": "5",
    "jobinfo_id": 23423
}
```

## DELETE

`http://localhost:8000/api/wishlist`
```json
{
    "user_id": "3",
    "jobinfo_id": 206
}
```

# DB

```sql
CREATE TABLE `wishlist` (
    `wishlist_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', --心願清單 ID
    `user_id` VARCHAR(36) NOT NULL COMMENT 'User ID', -- 用戶 ID
    `jobinfo_id` INT NOT NULL COMMENT 'Jobinfo ID', -- 喜歡的工作 ID
    PRIMARY KEY (`wishlist_id`), 
    UNIQUE (`user_id`, `jobinfo_id`) -- 確保每個用戶對應每個工作的心願清單不重複
);
```