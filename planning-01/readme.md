# WorkTraveler

## UI
https://www.figma.com/design/BRLB2bxOBLbJ1AI86V0Vo5/Untitled?node-id=1-512&t=uwV8F5E5Uip877pd-1

## 核心功能、功能架構圖
![messageImage_1728916462373](https://hackmd.io/_uploads/H19D2jcJkx.jpg)
### USER
- Search Working holiday (P0) (根據地點？根據熱門或推薦？) (我想到根據地點 然後先顯示最新)
- View Working holiday detail page (P0)
- Build a individual profile (P0)
- Send a request / cancel request (P0)
- Chat with landlord => WebSocket (一對一聊天) (P1)
- Wishlist (P1)
- Edit a request (P2)
- email to notify (P2) ( EventBridge (排程) -> Lambda -> email )


### Landlord
- Build a individual profile
- Approve / Reject / Ignore the request
- Check guests’ profile
- Calender

## 技術

- Backend
  - node.js (version, why?) 目前選 node 18，因為是LTS版，也是比較新的版本，性能有所提升，這個版本足以應付此專案的問題。
      - Express.js
  - mysql
  - websocket
- Frontend
  - JS (React + Vite)
  

## 團隊
- Branching Model: Github flow, why?
Git flow 適合較多人的專案，較為複雜，Github flow 和 (Trunk-Based Development) TBD 適合快速迭代的較小型專案，我們希望有完整的人工審查，因此選擇 Github flow。

- trello (how to use this app to manage the project)
![image](https://hackmd.io/_uploads/BJ87dH51Je.png)  
1. 分成三個區塊 (To do, doing, done)，以區分各個任務的進行階段  
2. 添加卡片，包含工作項目標題、詳細說明、截止日期，可以備註工作的優先級  
3. 分配任務給各個組員

reference of trello:
https://projectmanager.com.tw/%E5%B0%88%E6%A1%88%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7/trello-%E5%B0%88%E6%A1%88%E7%AE%A1%E7%90%86/

https://trello.com/zh-Hant/guide/trello-101
- [trello看版連結](
https://trello.com/b/T7JRT0On/%E6%88%91%E7%9A%84-trello-%E7%9C%8B%E6%9D%BF)
- 開會時間: 週六早上 10:00 ~ 12:00
- 這次討論中遇到的問題，以及你們是怎麼解決的？都沒有遇到問題，也可以寫沒有。
- 制定我們的 commit message 規範
```
<type>(optional scope): <description>

[optional body]

[optional footer(s)] 
```
type 主要有以下幾類
|type|description|code changed|
|---|---|---|
|Feat|	新功能|	有|
|Modify|	修改原有的功能|	有|
|Fix|	錯誤修正|	有|
|Docs|	更新文件，例如:更新readme.md|	沒有|
|Style|	修正程式碼的coding style|	沒有|

(footer用來備註，或是標註與第幾則 issue 有關，例如: `Refs: #123` 代表此更動與第 123 則 issue 有關)

Example: 
```
Feat(login): 新增用戶登入功能

- 添加了新的登入頁面
- 整合了 API 驗證
- 更新了相關文檔
```
```
Docs: 更新 README 文件

增加安裝步驟和示例。
```

reference of commit message rule:   
1. https://hackmd.io/@dh46tw/S1NPMsy5L
2. https://www.conventionalcommits.org/en/v1.0.0/
