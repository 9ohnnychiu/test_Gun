# Gun.js Glassmorphic CRUD

*[Read in English](README.md)*

這是一個展示如何使用 **[Gun.js](https://gun.eco/)** 建立即時、去中心化且跨瀏覽器同步的 Web 應用程式範例。此專案展示了使用者驗證（透過 SEA）以及基本的建立、讀取、更新和刪除（CRUD）操作，所有功能都包裝在現代化且具備質感的玻璃擬物化 (Glassmorphic) 使用者介面中。

### ✨ 功能特色

- **去中心化資料同步**：在一個瀏覽器/設備上所做的更改會即時同步到所有其他設備，無需中心化資料庫。
- **使用者驗證**：由 Gun 的安全、加密和授權（SEA）函式庫提供安全登入和註冊流程。
- **私有資料圖 (Private Data Graphs)**：資料會被限定並加密在已驗證使用者的個人圖中。
- **玻璃擬物化 (Glassmorphic) UI**：令人驚豔的現代化介面，特色包含模糊背景、漸層色彩、微動畫設計與響應式排版。
- **本地中繼站 (Local Relay)**：包含 Python 後端中繼伺服器，能提供極速的本地開發與同步體驗。

### 🚀 開始使用

#### 系統需求

- [Node.js](https://nodejs.org/) (建議 v16 或以上版本)
- `npm` (隨 Node.js 安裝)
- Python (作為中繼伺服器使用)
- `uv` (Python 套件管理器)

#### 安裝步驟

1. 複製或下載此儲存庫到您的本機電腦。
2. 打開終端機並導覽至專案資料夾。
3. 安裝所需的 Node 依賴套件：

```bash
npm install
```

*(註：本專案需要 `express` 和 `gun` 來運行本地伺服器。專案中包含 `.gitignore` 檔案以確保 `node_modules/` 不會被提交)。*

#### 執行應用程式

為了體驗即時同步，您需要同時執行前端與本地 Python 中繼伺服器。

1. **啟動 Python 中繼伺服器：**
   打開終端機，進入 `python_relay` 資料夾並執行：
   ```bash
   cd python_relay
   uv run server.py
   ```
   *這將會在 Port 8000 啟動本地 Socket 伺服器。*

2. **啟動前端 Web 應用程式：**
   開啟另一個終端機並啟動靜態網頁伺服器：
   ```bash
   npx serve .
   ```
   *(註：您也可以使用 Live Server 或任何其他靜態主機伺服器，因為應用的核心邏輯全都在客戶端執行)。*

3. 開啟網頁瀏覽器並前往：
   **http://localhost:3000** (或 `serve` 指令輸出的對應 Port)。

4. **測試即時同步：** 開啟無痕視窗或完全不同的網頁瀏覽器（例如 Chrome 和 Edge）並導覽至相同 URL。在兩個畫面上同時登入您的帳號即可看見效果。

### 🧪 測試

應用程式會在啟動時自動建立一組預設的測試帳號，以便您能夠快速體驗：

- **使用者名稱 (Username):** `testuser1`
- **密碼 (Password):** `password123`

您也可以使用 **Sign Up（註冊）** 按鈕來建立專屬於您的安全身分。

### 🛠️ 使用技術

- **HTML5 & Vanilla JavaScript**: 負責結構和應用程式邏輯。
- **Vanilla CSS3**: 自訂的玻璃擬物化樣式、Flexbox/Grid 排版以及動畫。
- **[Gun.js](https://gun.eco/)**: 去中心化的即時圖形資料庫引擎。
- **Gun SEA**: 提供加密安全技術，用於使用者驗證和資料加密。
- **Python (FastAPI/WebSockets)**: 用於運行本地端的 Gun 中繼站。

### 📂 專案結構

- `python_relay/server.py` - 作為 Gun 中繼站的 Python WebSocket 伺服器。
- `app.js` - 連接 Gun、管理驗證並處理 CRUD DOM 操作的核心前端邏輯。
- `index.html` - 主要進入點和 UI 佈局。
- `style.css` - 設計系統和玻璃擬物化樣式。
- `package.json` - Node 專案清單檔案和腳本。

### 💡 如何使用 CRUD 功能

1. **建立 (Create):** 在儀表板底部的輸入框中輸入文字，然後點擊 **+**（加號）按鈕。
2. **讀取 (Read):** 您的項目會立即出現在列表中。它們也會同步並顯示在登入同一帳號的其他瀏覽器上。
3. **更新 (Update):** 連按兩下任何項目的文字即可進行原地編輯。按 `Enter` 鍵或點擊其他地方即可儲存變更。
4. **刪除 (Delete):** 點擊任何項目旁邊的垃圾桶圖示即可將其從您的資料圖中移除。

### ⚠️ 部署限制 (GitHub Pages)

**為什麼此專案無法部署於 GitHub Pages？**

這個專案**無法**單獨依賴 GitHub Pages 運行。原因在於環境的根本限制：GitHub Pages 只能託管**「靜態檔案」**（如純 HTML、CSS、與瀏覽器端執行的 JavaScript 等）。

根據本專案的架構，這是一個需要後端伺服器的應用：
1. **Python 中繼伺服器**：需要執行在背景的 WebSocket 服務來維持資料即時同步。
2. **Node.js 中繼伺服器**：歷史版本中使用 `express` 來啟動伺服器 (`app.listen(3000)`)，並初始化了 Gun.js 作為資料庫/中繼點 (`Gun({ web: server... })`)。

這代表你必須在終端機保持執行伺服器程式碼（如 `uv run server.py`）讓它處於運行狀態。然而，GitHub Pages 的伺服器並不允許你執行背景服務，也無法開啟特定的 Port（例如 3000 或 8000）。

如果你嘗試透過 GitHub Action 將此專案部署到 GitHub Pages，結果只會是 GitHub Pages 把它們當成普通的文字檔公開在網路上。伺服器根本不會啟動，Gun.js 中繼站也不會運作，因此應用程式將無法發揮其即時同步與保存資料的功能。

---
*Built with ❤️ to demonstrate the power of local-first, decentralized web applications.*
