# Gun.js Glassmorphic CRUD

A demonstration of building a real-time, decentralized, and cross-browser synchronized Web Application using **[Gun.js](https://gun.eco/)**. This project showcases User Authentication (with SEA) and basic Create, Read, Update, and Delete (CRUD) operations, all wrapped in a modern, premium Glassmorphic user interface.

## ✨ Features

- **Decentralized Data Sync**: Changes made in one browser/device are instantly synchronized to all others in real time without a centralized database.
- **User Authentication**: Secure Login & Sign-up flows powered by Gun's Security, Encryption, & Authorization (SEA) library.
- **Private Data Graphs**: Data is scoped and encrypted to the authenticated user's personal graph.
- **Glassmorphic UI**: A stunning, modern interface featuring blurred backgrounds, vibrant gradients, micro-animations, and responsive design.
- **Local Relay**: Included Express.js backend that acts as a local Gun relay for blazing-fast local development and synchronization.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- `npm` (comes with Node.js)

### Installation

1. Clone or download the repository to your local machine.
2. Open your terminal and navigate to the project folder.
3. Install the required Node dependencies:

```bash
npm install
```

*(Note: The project requires `express` and `gun` to run the local server. A `.gitignore` is included to exclude `node_modules/` from your commits).*

### Running the Application

To experience the real-time sync, you need to run the local relay server.

1. Start the server:

```bash
npm start
```
*(Alternatively, you can run `node server.js`)*

2. Open your web browser and navigate to:
   **http://localhost:3000**

3. **To test instant sync:** Open an Incognito Window or a completely different web browser (e.g., Chrome and Edge) and navigate to the same URL. Log in simultaneously on both screens.

## 🧪 Testing

The application automatically creates a preset test account on startup so you can jump right in.

- **Username:** `testuser1`
- **Password:** `password123`

You can also use the **Sign Up** button to create your own secure identities.

## 🛠️ Built With

- **HTML5 & Vanilla JavaScript**: For structure and application logic.
- **Vanilla CSS3**: Custom glassmorphism styling, flexbox/grid layouts, and animations.
- **[Gun.js](https://gun.eco/)**: The decentralized, real-time graph database engine.
- **Gun SEA**: Cryptographic security for user authentication and data encryption.
- **Express.js**: For serving the static files and running the local Gun relay.

## 📂 Project Structure

- `server.js` - The Node/Express server that serves frontend files and initializes the Gun relay.
- `app.js` - The core frontend logic connecting to Gun, managing auth, and handling CRUD DOM manipulation.
- `index.html` - The main entry point and UI layout.
- `style.css` - The design system and glassmorphic styles.
- `package.json` - Node project manifests and scripts.

## 💡 How to Use the CRUD Features

1. **Create:** Type text into the bottom input bar on the dashboard and click the **+** (plus) button.
2. **Read:** Your items will instantly appear in the list. They will also sync to any other browser logged into the same account.
3. **Update:** Double-click on any item's text to edit it in place. Press `Enter` or click elsewhere to save your changes.
4. **Delete:** Click the trashcan icon next to any item to remove it from your graph.

---
*Built with ❤️ to demonstrate the power of local-first, decentralized web applications.*
