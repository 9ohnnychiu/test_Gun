// Configure Gun with public relays to ensure GitHub Pages functions across devices
// and uses localStorage as fallback/cache.
const peers = [
    window.location.origin + '/gun', // Local relay for instant cross-browser sync
    'https://gun-manhattan.herokuapp.com/gun',
    'https://relay.peer.ooo/gun'
];

// Initialize gun and SEA
const gun = Gun({ peers: peers });
const user = gun.user().recall({sessionStorage: true});

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const btnSignup = document.getElementById('btn-signup');
const btnLogout = document.getElementById('btn-logout');
const toastEl = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const currentUserDisplay = document.getElementById('current-user-display');

const addItemForm = document.getElementById('add-item-form');
const newItemInput = document.getElementById('new-item-input');
const itemsList = document.getElementById('items-list');
const emptyState = document.getElementById('empty-state');

// State
let itemsCount = 0;
let userItemsNode = null;

// Initialization: Auto-create preset accounts if they don't exist
// This fulfills the "preset accounts for test" requirement.
async function initPresetAccounts() {
    const presetUser = 'testuser1';
    const presetPass = 'password123';
    
    gun.get(`~@${presetUser}`).once((data) => {
        if(!data){
            // Does not exist, create it
            gun.user().create(presetUser, presetPass, (ack) => {
                if(ack.err){
                    console.log("Preset account init issue:", ack.err);
                } else {
                    console.log(`Preset account ${presetUser} initialized.`);
                }
            });
        }
    });
}
initPresetAccounts();

// Utility: Show Toast Notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toastEl.className = `toast show ${type}`;
    setTimeout(() => {
        toastEl.className = 'toast';
    }, 3000);
}

// Utility: Toggle UI Views
function showDashboard(username) {
    loginSection.classList.remove('active');
    setTimeout(() => {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        setTimeout(() => dashboardSection.classList.add('active'), 50);
    }, 400); // Wait for fade out
    
    currentUserDisplay.textContent = username;
    
    // Set up user's private data node
    userItemsNode = user.get('my_crud_items');
    loadItems();
}

function showLogin() {
    dashboardSection.classList.remove('active');
    setTimeout(() => {
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        setTimeout(() => loginSection.classList.add('active'), 50);
    }, 400);
    
    // Clear list
    itemsList.innerHTML = '';
    itemsCount = 0;
    updateEmptyState();
}

// Auth Handlers
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Default form submit maps to Login
    performLogin();
});

btnSignup.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if(!username || !password) {
        showToast('Please enter both username and password.', 'error');
        return;
    }

    user.create(username, password, (ack) => {
        if (ack.err) {
            showToast(ack.err, 'error');
        } else {
            showToast('Account created successfully! Logging in...');
            performLogin(username, password);
        }
    });
});

function performLogin(u, p) {
    const username = u || usernameInput.value.trim();
    const password = p || passwordInput.value.trim();

    if(!username || !password) {
        showToast('Please enter credentials.', 'error');
        return;
    }

    user.auth(username, password, (ack) => {
        if (ack.err) {
            showToast(ack.err, 'error');
        } else {
            showToast('Logged in successfully!');
            usernameInput.value = '';
            passwordInput.value = '';
            showDashboard(username);
        }
    });
}

btnLogout.addEventListener('click', () => {
    user.leave();
    showToast('Logged out.');
    showLogin();
});

// Check if already logged in on load
gun.on('auth', () => {
    const alias = user.is.alias;
    if(alias && dashboardSection.classList.contains('hidden')) {
        showDashboard(alias);
    }
});

// CRUD Opertions------------------------------------------------------

// CREATE
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = newItemInput.value.trim();
    if(!text) return;

    const timestamp = Gun.state();
    const id = Gun.text.random(10); // Generate simple ID
    
    // Create new node and link to the user's items graph
    const dataObj = { text: text, createdAt: timestamp, id: id };
    userItemsNode.get(id).put(dataObj);
    
    newItemInput.value = '';
    showToast('Item created');
});

// READ (Live Map)
function loadItems() {
    itemsList.innerHTML = '';
    itemsCount = 0;
    updateEmptyState();

    userItemsNode.map().on((data, id) => {
        if (data === null) {
            // Null signifies deletion
            const el = document.getElementById(`item-${id}`);
            if (el) {
                el.remove();
                itemsCount--;
                updateEmptyState();
            }
            return;
        }
        
        // If data exists, update or create DOM element
        let li = document.getElementById(`item-${id}`);
        
        if (!li) {
            // Create new element
            li = document.createElement('li');
            li.id = `item-${id}`;
            li.className = 'item-card';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'item-content';
            
            const textSpan = document.createElement('span');
            textSpan.className = 'item-text';
            textSpan.textContent = data.text;
            
            // Double click to edit in place
            textSpan.addEventListener('dblclick', () => {
                textSpan.contentEditable = true;
                textSpan.classList.add('editing');
                textSpan.focus();
            });
            
            // Blur/Enter to save
            textSpan.addEventListener('blur', () => saveEdit(id, textSpan));
            textSpan.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    textSpan.blur();
                }
            });

            const dateSpan = document.createElement('span');
            dateSpan.className = 'item-meta';
            const dateStr = new Date(data.createdAt).toLocaleString();
            dateSpan.textContent = `Added: ${dateStr}`;

            contentDiv.appendChild(textSpan);
            contentDiv.appendChild(dateSpan);
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'item-actions';
            
            const delBtn = document.createElement('button');
            delBtn.className = 'btn-icon delete';
            delBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
            delBtn.onclick = () => deleteItem(id);
            
            actionsDiv.appendChild(delBtn);
            
            li.appendChild(contentDiv);
            li.appendChild(actionsDiv);
            
            // Sort by time (prepend to put newest first, though gun is decentralized)
            itemsList.insertBefore(li, itemsList.firstChild);
            itemsCount++;
            updateEmptyState();
        } else {
            // Update existing element (in case synchronized from another peer)
            const textEl = li.querySelector('.item-text');
            if (textEl.textContent !== data.text && !textEl.classList.contains('editing')) {
                textEl.textContent = data.text;
            }
        }
    });
}

// UPDATE
function saveEdit(id, textSpan) {
    textSpan.contentEditable = false;
    textSpan.classList.remove('editing');
    
    const newText = textSpan.textContent.trim();
    if(newText) {
        userItemsNode.get(id).get('text').put(newText);
        showToast('Item updated', 'success');
    } else {
        // If empty, delete it
        deleteItem(id);
    }
}

// DELETE
function deleteItem(id) {
    // In Gun, delete is achieved by putting null
    userItemsNode.get(id).put(null);
    showToast('Item deleted');
}

function updateEmptyState() {
    if (itemsCount > 0) {
        emptyState.style.display = 'none';
        itemsList.style.display = 'flex';
    } else {
        emptyState.style.display = 'block';
        itemsList.style.display = 'none';
    }
}
