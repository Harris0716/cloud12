**RESTful API** 

https://DNS/api/v1  

/api/login：登入  
/api/Workingholiday:顯示所有的打工換宿   

## 用戶管理
- POST /register: 註冊新用戶  
Request body:  
{“username”:string, “email”:string, “password”:string, “user_id”:string}  
Response:  
{“message”:”create success!”}  
- POST /login: 用戶登入  
Request body:  
{“username”:string, “password”:string}  
Response:  
登入成功:{“message”:”Login success!”, “token”:"jwt-token"}  
登入失敗:{“message”:”Login fail!”}  
- GET /users/{userId}: 獲取用戶資料(讓房東審查資料用)  
Response:  
{“username”:string, “email”:string}  

## 工作資訊
- GET /jobs: 獲取所有工作列表
- GET /jobs/{id}: 獲取特定工作詳細資料
- POST /jobs: 新增工作資訊 (需驗證)
- PUT /jobs/{id}: 更新工作資訊 (需驗證)
- DELETE /jobs/{id}: 刪除工作資訊 (需驗證)
- GET /applyList：取得該打工換宿工作者的申請列表
- 心願清單
- 獲取履歷資訊



# 用戶資訊 API
## 1.1 註冊新用戶
POST /users/register  
Request body:  
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```


Response:
```json
{
  "message": "create success!"
}
```


## 1.2 用戶登入
POST /users/login
Request body:
```json
{
  "email": "string",
  "password": "string"
}
```


Response:
```json
{
  "token": "string"
}
```
## 1.3 獲取用戶資料
GET /users/profile
Headers:
css
Authorization: Bearer {token}

Response:
```json

{
  "username": "string",
  "email": "string"
}
```

# 2. 工作資訊 API
## 2.1 獲取所有工作列表
GET /jobs
Response:
```json

[
  {
    "id": "integer",
    "title": "string",
    "company": "string",
    "location": "string",
    "posted_at": "date"
  }
]
```


2.2 獲取特定工作詳細資料
GET /jobs/{id}
Response:
```json

{
  "id": "integer",
  "title": "string",
  "description": "string",
  "company": "string",
  "location": "string",
  "requirements": "string",
  "posted_at": "date"
}
```


2.3 新增工作資訊
POST /jobs
Headers:
css
Authorization: Bearer {token}


Request body:
```json

{
  "title": "string",
  "description": "string",
  "company": "string",
  "location": "string",
  "requirements": "string"
}
```


Response:
```json

{
  "message": "job created successfully!",
  "job_id": "integer"
}
```


2.4 更新工作資訊
PUT /jobs/{id}
Headers:
css
Authorization: Bearer {token}


Request body:
```json

{
  "title": "string",
  "description": "string",
  "company": "string",
  "location": "string",
  "requirements": "string"
}
```


Response:
```json

{
  "message": "job updated successfully!"
}
```


2.5 刪除工作資訊
DELETE /jobs/{id}
Headers:
css
Authorization: Bearer {token}


Response:
```json

{
  "message": "job deleted successfully!"
}
```


3. 履歷資訊 API
3.1 獲取履歷資訊
GET /resume
Headers:
css
Authorization: Bearer {token}


Response:
```json

{
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "integer"
    }
  ],
  "experience": [
    {
      "job_title": "string",
      "company": "string",
      "years": "string"
    }
  ],
  "skills": ["string"]
}
```


3.2 獲取心願清單
GET /applyList
Headers:
css
Authorization: Bearer {token}


Response:
```json
[
  {
    "job_id": "integer",
    "title": "string",
    "status": "string"
  }
]
```
