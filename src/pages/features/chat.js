// src/modules/chat.js - Chat module

let chatOpen = false;

// Mock friends (will come from actual friends list later)
const chatFriends = [
  { username: 'vex', status: 'online', lastMessage: 'sure', time: 'NOW' },
  { username: 'mamaolat1', status: 'offline', time: '3:13 PM' },
  { username: 'Same', status: 'online', lastMessage: '>:)', time: '' },
  { username: 'emmilla330', status: 'offline', time: 'Yesterday' },
  { username: 'Bigboy05161', status: 'offline', time: 'Yesterday' },
  { username: 'killer4780', status: 'offline', time: 'Tue' }
];

export function initChat() {
  const chatToggle = document.getElementById('chat-toggle');
  
  if (!chatToggle) return;
  
  chatToggle.addEventListener('click', toggleChat);
}

function toggleChat() {
  if (chatOpen) {
    closeChat();
  } else {
    openChat();
  }
}

function openChat() {
  chatOpen = true;
  
  // Create chat panel
  const panel = document.createElement('div');
  panel.className = 'chat-panel show';
  panel.id = 'chat-panel';
  
  panel.innerHTML = `
    <div style="padding: 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
      <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Chat</h3>
      <button id="chat-settings" style="background: none; border: none; color: var(--muted); cursor: pointer; padding: 4px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6"></path>
        </svg>
      </button>
    </div>
    
    <div style="padding: 12px; border-bottom: 1px solid var(--border);">
      <input type="text" placeholder="Search for Connections" style="
        width: 100%; padding: 8px 12px; background: var(--panel-soft);
        border: 1px solid var(--border); border-radius: var(--radius-sm);
        color: var(--text); font-size: 13px; outline: none;
      " />
    </div>
    
    <div style="flex: 1; overflow-y: auto; padding: 8px;">
      ${renderChatList()}
    </div>
  `;
  
  document.body.appendChild(panel);
  
  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 0);
}

function closeChat() {
  chatOpen = false;
  const panel = document.getElementById('chat-panel');
  if (panel) panel.remove();
  document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(e) {
  const panel = document.getElementById('chat-panel');
  const toggle = document.getElementById('chat-toggle');
  
  if (panel && !panel.contains(e.target) && !toggle.contains(e.target)) {
    closeChat();
  }
}

function renderChatList() {
  return chatFriends.map(friend => `
    <div onclick="openChatWindow('${friend.username}')" style="
      display: flex; align-items: center; gap: 12px; padding: 10px;
      border-radius: var(--radius-sm); cursor: pointer;
      transition: background 0.15s;
    " onmouseover="this.style.background='var(--panel-soft)'" 
       onmouseout="this.style.background='transparent'">
      <div style="position: relative;">
        <div style="
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--panel-soft); display: flex;
          align-items: center; justify-content: center;
          font-weight: 600; font-size: 14px; color: var(--text);
        ">
          ${friend.username.slice(0, 2).toUpperCase()}
        </div>
        ${friend.status === 'online' ? `
          <span style="
            position: absolute; bottom: 0; right: 0;
            width: 12px; height: 12px; background: #10b981;
            border-radius: 50%; border: 2px solid var(--panel);
          "></span>
        ` : ''}
      </div>
      
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-weight: 600; font-size: 14px;">${friend.username}</span>
          ${friend.time === 'NOW' ? `
            <span style="
              background: #f59e0b; color: #000; font-size: 10px;
              font-weight: 700; padding: 2px 6px; border-radius: 4px;
            ">NOW</span>
          ` : friend.time ? `
            <span style="font-size: 11px; color: var(--muted);">${friend.time}</span>
          ` : ''}
        </div>
        ${friend.lastMessage ? `
          <div style="font-size: 13px; color: var(--muted);">${friend.lastMessage}</div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

window.openChatWindow = function(username) {
  alert(`Opening chat with ${username} - Coming soon!`);
};