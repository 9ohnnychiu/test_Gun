# Gun.js Glassmorphic CRUD

*[閱讀繁體中文版本 (Read in Traditional Chinese)](README.zh-TW.md)*

A demonstration of building a real-time, decentralized, and cross-browser synchronized Web Application using **[Gun.js](https://gun.eco/)**. This project showcases User Authentication (with SEA) and basic Create, Read, Update, and Delete (CRUD) operations, all wrapped in a modern, premium Glassmorphic user interface.

### ✨ Features

- **Decentralized Data Sync**: Changes made in one browser/device are instantly synchronized to all others in real time without a centralized database.
- **User Authentication**: Secure Login & Sign-up flows powered by Gun's Security, Encryption, & Authorization (SEA) library.
- **Private Data Graphs**: Data is scoped and encrypted to the authenticated user's personal graph.
- **Glassmorphic UI**: A stunning, modern interface featuring blurred backgrounds, vibrant gradients, micro-animations, and responsive design.
- **Local Relay**: Included Python backend and Node serve capabilities that acts as a local Gun relay for blazing-fast local development and synchronization.

### 🚀 Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- `npm` (comes with Node.js)
- Python (for the relay server)
- `uv` (Python package manager)

#### Installation

1. Clone or download the repository to your local machine.
2. Open your terminal and navigate to the project folder.
3. Install the required Node dependencies:

```bash
npm install
```

*(Note: The project requires `express` and `gun` to run the local server. A `.gitignore` is included to exclude `node_modules/` from your commits).*

#### Running the Application

To experience the real-time sync, you need to run both the frontend and the local Python relay server.

1. **Start the Python Relay Server:**
   Open a terminal, navigate to `python_relay` and run:
   ```bash
   cd python_relay
   uv run server.py
   ```
   *This starts the local socket server on port 8000.*

2. **Start the Frontend Web App:**
   Open a separate terminal and start a static web server:
   ```bash
   npx serve .
   ```
   *(Note: You can use Live Server or any other static host since the app logic is purely client-side).*

3. Open your web browser and navigate to:
   **http://localhost:3000** (or whatever port `serve` outputs).

4. **To test instant sync:** Open an Incognito Window or a completely different web browser (e.g., Chrome and Edge) and navigate to the same URL. Log in simultaneously on both screens.

### 🧪 Testing

The application automatically creates a preset test account on startup so you can jump right in.

- **Username:** `testuser1`
- **Password:** `password123`

You can also use the **Sign Up** button to create your own secure identities.

### 🛠️ Built With

- **HTML5 & Vanilla JavaScript**: For structure and application logic.
- **Vanilla CSS3**: Custom glassmorphism styling, flexbox/grid layouts, and animations.
- **[Gun.js](https://gun.eco/)**: The decentralized, real-time graph database engine.
- **Gun SEA**: Cryptographic security for user authentication and data encryption.
- **Python (FastAPI/WebSockets)**: For running the local Gun relay.

### 📂 Project Structure

- `python_relay/server.py` - The Python websocket server for Gun relay.
- `app.js` - The core frontend logic connecting to Gun, managing auth, and handling CRUD DOM manipulation.
- `index.html` - The main entry point and UI layout.
- `style.css` - The design system and glassmorphic styles.
- `package.json` - Node project manifests and scripts.

### 💡 How to Use the CRUD Features

1. **Create:** Type text into the bottom input bar on the dashboard and click the **+** (plus) button.
2. **Read:** Your items will instantly appear in the list. They will also sync to any other browser logged into the same account.
3. **Update:** Double-click on any item's text to edit it in place. Press `Enter` or click elsewhere to save your changes.
4. **Delete:** Click the trashcan icon next to any item to remove it from your graph.

### ⚠️ Deployment Limitations (GitHub Pages)

**Why not GitHub Pages?**

This project **cannot** rely solely on GitHub Pages to run. The reason lies in the fundamental limitations of the environment: GitHub Pages can only host **"static files"** (such as plain HTML, CSS, and client-side JavaScript).

Based on the architecture of this project, it is an application that requires a backend server:
1. **Python Relay Server**: Maintaining real-time data synchronization requires a background WebSocket service.
2. **Node.js/Express**: Historically used to start the server (`app.listen(3000)`) and initialize Gun.js as a database/relay node.

This means you must keep the server code running in the terminal (e.g., `uv run server.py`) to keep it active. However, the GitHub Pages server does not allow you to run background services, nor can you open specific ports (such as 3000 or 8000).

If you try to deploy this project to GitHub Pages via GitHub Actions, the result will only be GitHub Pages publishing them as ordinary text files on the internet. The server will not start, and the Gun.js relay will not operate, so the application will not be able to perform its real-time synchronization and data persistence functions.

---
*Built with ❤️ to demonstrate the power of local-first, decentralized web applications.*
