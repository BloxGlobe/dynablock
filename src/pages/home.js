// src/pages/home.js

// Store friends list
let friends = [];

// Generate initials from username
function getInitials(username) {
  return username.slice(0, 2).toUpperCase();
}

// Render friends list
function renderFriendsList() {
  return friends.map((friend, index) => `
    <div class="friend" data-friend-index="${index}">
      <div class="avatar placeholder">
        ${getInitials(friend.username)}
        <span class="status-indicator status-${friend.status}"></span>
      </div>
      <span class="name">${friend.username}</span>
      
      <div class="friend-dropdown" id="dropdown-${index}">
        <button onclick="messageFriend('${friend.username}')">💬 Message</button>
        <button onclick="viewProfile('${friend.username}')">👤 View Profile</button>
        <button class="danger" onclick="blockFriend('${friend.username}')">🚫 Block</button>
        <button class="danger" onclick="removeFriend(${index})">❌ Unfriend</button>
      </div>
    </div>
  `).join('');
}

// Show add friend modal
function showAddFriendModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex; align-items: center;
    justify-content: center; z-index: 1000;
  `;
  
  modal.innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color);
      border-radius: 12px; padding: 24px; width: 90%; max-width: 400px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);">
      <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">Add Friend</h2>
      <p style="color: var(--text-medium); font-size: 14px; margin-bottom: 16px;">
        Enter a username to send a friend request
      </p>
      
      <input type="text" id="friend-username-input" placeholder="Enter username..."
        style="width: 100%; padding: 10px 12px; background: var(--bg-page);
        border: 1px solid var(--border-color); border-radius: 8px;
        color: var(--text-dark); font-size: 14px; margin-bottom: 16px;" />
      
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button onclick="closeAddFriendModal()" class="btn-secondary">Cancel</button>
        <button onclick="addFriendFromModal()" class="btn-primary">Add Friend</button>
      </div>
    </div>
  `;
  
  modal.id = 'add-friend-modal';
  document.body.appendChild(modal);
  
  setTimeout(() => {
    const input = document.getElementById('friend-username-input');
    if (input) input.focus();
  }, 100);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAddFriendModal();
  });
}

// Close modal
window.closeAddFriendModal = function() {
  const modal = document.getElementById('add-friend-modal');
  if (modal) modal.remove();
};

// Add friend from modal
window.addFriendFromModal = function() {
  const input = document.getElementById('friend-username-input');
  const username = input?.value.trim();
  
  if (username) {
    friends.push({ username, status: 'online' });
    renderHomePage();
    closeAddFriendModal();
  }
};

// Message friend
window.messageFriend = function(username) {
  alert(`Chat with ${username} - Coming soon!`);
};

// View profile
window.viewProfile = function(username) {
  alert(`Viewing ${username}'s profile - Coming soon!`);
};

// Block friend
window.blockFriend = function(username) {
  if (confirm(`Block ${username}?`)) {
    alert(`${username} blocked`);
  }
};

// Remove friend
window.removeFriend = function(index) {
  const friend = friends[index];
  if (confirm(`Unfriend ${friend.username}?`)) {
    friends.splice(index, 1);
    renderHomePage();
  }
};

// Setup dropdown listeners
function setupDropdownListeners() {
  const friendElements = document.querySelectorAll('.friend[data-friend-index]');
  
  friendElements.forEach((friendEl) => {
    const dropdown = friendEl.querySelector('.friend-dropdown');
    
    if (!dropdown) return;
    
    friendEl.addEventListener('click', (e) => {
      e.stopPropagation();
      
      document.querySelectorAll('.friend-dropdown.show').forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      
      dropdown.classList.toggle('show');
    });
  });
  
  document.addEventListener('click', () => {
    document.querySelectorAll('.friend-dropdown.show').forEach(d => {
      d.classList.remove('show');
    });
  });
}

// Show all friends
window.showAllFriends = function() {
  alert('Friends list view - Coming soon!');
};

// Main render function
export default function Home(container) {
  // Inject friends CSS
  if (!document.getElementById('friend-css')) {
    const link = document.createElement('link');
    link.id = 'friend-css';
    link.rel = 'stylesheet';
    link.href = 'src/utils/css/friend.css';
    document.head.appendChild(link);
  }

  container.innerHTML = `
    <section class="section home-section">
      <div class="home-header">
        <h2>Home</h2>
      </div>

      <div class="friends-header">
        <h3>Friends <span class="count">(${friends.length})</span></h3>
        <button class="see-all" onclick="showAllFriends()">See all →</button>
      </div>

      <div class="friends-row">
        <div class="friend add-friend" onclick="showAddFriendModal()">
          <div class="avatar">
            <span class="plus">+</span>
          </div>
          <span class="label">Add friend</span>
        </div>

        ${renderFriendsList()}
      </div>
    </section>
  `;
  
  setTimeout(setupDropdownListeners, 0);
}

window.showAddFriendModal = showAddFriendModal;