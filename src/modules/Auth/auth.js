// src/modules/Auth/auth.js - Authentication module

let currentUser = null;

// Initialize auth
export function initAuth() {
  // Check if user is logged in (from localStorage)
  const savedUser = localStorage.getItem('dynablocks_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUIForLoggedInUser();
  }
  
  // Setup profile button click
  const profileBtn = document.querySelector('.profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentUser) {
        showUserMenu();
      } else {
        showAuthModal();
      }
    });
  }
}

// Show auth modal (signup/login)
function showAuthModal() {
  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7); display: flex;
    align-items: center; justify-content: center; z-index: 1000;
  `;
  
  modal.innerHTML = `
    <div style="
      background: var(--panel); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 32px; width: 90%;
      max-width: 420px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
    ">
      <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600;">Welcome to DynaBlocks</h2>
      <p style="color: var(--muted); font-size: 14px; margin-bottom: 24px;">
        Sign up or log in to continue
      </p>
      
      <div id="auth-tabs" style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid var(--border);">
        <button class="auth-tab active" data-tab="login">Log In</button>
        <button class="auth-tab" data-tab="signup">Sign Up</button>
      </div>
      
      <div id="login-form" class="auth-form">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Username or Email</label>
          <input type="text" id="login-username" style="
            width: 100%; padding: 10px 12px; background: var(--panel-soft);
            border: 1px solid var(--border); border-radius: var(--radius-sm);
            color: var(--text); font-size: 14px; outline: none;
          " />
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Password</label>
          <input type="password" id="login-password" style="
            width: 100%; padding: 10px 12px; background: var(--panel-soft);
            border: 1px solid var(--border); border-radius: var(--radius-sm);
            color: var(--text); font-size: 14px; outline: none;
          " />
        </div>
        
        <button onclick="handleLogin()" style="
          width: 100%; padding: 12px; background: var(--accent);
          border: none; border-radius: var(--radius-sm); color: var(--text);
          font-weight: 600; font-size: 14px; cursor: pointer;
        ">Log In</button>
      </div>
      
      <div id="signup-form" class="auth-form" style="display: none;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Username</label>
          <input type="text" id="signup-username" style="
            width: 100%; padding: 10px 12px; background: var(--panel-soft);
            border: 1px solid var(--border); border-radius: var(--radius-sm);
            color: var(--text); font-size: 14px; outline: none;
          " />
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Email</label>
          <input type="email" id="signup-email" style="
            width: 100%; padding: 10px 12px; background: var(--panel-soft);
            border: 1px solid var(--border); border-radius: var(--radius-sm);
            color: var(--text); font-size: 14px; outline: none;
          " />
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500;">Password</label>
          <input type="password" id="signup-password" style="
            width: 100%; padding: 10px 12px; background: var(--panel-soft);
            border: 1px solid var(--border); border-radius: var(--radius-sm);
            color: var(--text); font-size: 14px; outline: none;
          " />
        </div>
        
        <button onclick="handleSignup()" style="
          width: 100%; padding: 12px; background: var(--accent);
          border: none; border-radius: var(--radius-sm); color: var(--text);
          font-weight: 600; font-size: 14px; cursor: pointer;
        ">Sign Up</button>
      </div>
      
      <button onclick="closeAuthModal()" style="
        position: absolute; top: 16px; right: 16px;
        background: none; border: none; color: var(--muted);
        font-size: 24px; cursor: pointer; padding: 4px;
      ">×</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Tab switching
  const tabs = modal.querySelectorAll('.auth-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
  });
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAuthModal();
  });
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  
  if (tab === 'login') {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
  } else {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
  }
}

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.remove();
};

window.handleLogin = function() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  
  if (!username || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // Mock login (will connect to backend later)
  const user = {
    username: username,
    email: `${username}@example.com`,
    joinDate: new Date().toISOString()
  };
  
  currentUser = user;
  localStorage.setItem('dynablocks_user', JSON.stringify(user));
  
  closeAuthModal();
  updateUIForLoggedInUser();
  alert(`Welcome back, ${username}!`);
};

window.handleSignup = function() {
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  
  if (!username || !email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // Mock signup (will connect to backend later)
  const user = {
    username: username,
    email: email,
    joinDate: new Date().toISOString()
  };
  
  currentUser = user;
  localStorage.setItem('dynablocks_user', JSON.stringify(user));
  
  closeAuthModal();
  updateUIForLoggedInUser();
  alert(`Welcome to DynaBlocks, ${username}!`);
};

function updateUIForLoggedInUser() {
  // Update profile button to show initial
  const profileBtn = document.querySelector('.profile-btn');
  if (profileBtn && currentUser) {
    profileBtn.innerHTML = `
      <div style="
        width: 32px; height: 32px; border-radius: 50%;
        background: var(--accent-soft); color: var(--accent);
        display: flex; align-items: center; justify-content: center;
        font-weight: 600; font-size: 13px;
      ">
        ${currentUser.username.slice(0, 2).toUpperCase()}
      </div>
    `;
  }
}

function showUserMenu() {
  const menu = document.createElement('div');
  menu.id = 'user-menu';
  menu.style.cssText = `
    position: fixed; top: 70px; right: 20px;
    background: var(--panel); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 8px; min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); z-index: 999;
  `;
  
  menu.innerHTML = `
    <div style="padding: 12px; border-bottom: 1px solid var(--border); margin-bottom: 8px;">
      <div style="font-weight: 600; font-size: 14px;">${currentUser.username}</div>
      <div style="font-size: 12px; color: var(--muted);">${currentUser.email}</div>
    </div>
    
    <button onclick="goToSettings()" style="
      width: 100%; padding: 10px 12px; background: none; border: none;
      color: var(--text); text-align: left; border-radius: var(--radius-sm);
      cursor: pointer; font-size: 13px;
    " onmouseover="this.style.background='var(--panel-soft)'" 
       onmouseout="this.style.background='none'">
      ⚙️ Settings
    </button>
    
    <button onclick="handleLogout()" style="
      width: 100%; padding: 10px 12px; background: none; border: none;
      color: #ef4444; text-align: left; border-radius: var(--radius-sm);
      cursor: pointer; font-size: 13px;
    " onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'" 
       onmouseout="this.style.background='none'">
      🚪 Log Out
    </button>
  `;
  
  document.body.appendChild(menu);
  
  setTimeout(() => {
    document.addEventListener('click', closeUserMenu);
  }, 0);
}

function closeUserMenu() {
  const menu = document.getElementById('user-menu');
  if (menu) menu.remove();
  document.removeEventListener('click', closeUserMenu);
}

window.goToSettings = function() {
  window.location.hash = 'settings';
  closeUserMenu();
};

window.handleLogout = function() {
  if (confirm('Are you sure you want to log out?')) {
    currentUser = null;
    localStorage.removeItem('dynablocks_user');
    
    // Reset profile button
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
      profileBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    }
    
    closeUserMenu();
    alert('Logged out successfully');
  }
};

export function getCurrentUser() {
  return currentUser;
}

export function isLoggedIn() {
  return currentUser !== null;
}

// Add CSS for auth tabs
const style = document.createElement('style');
style.textContent = `
  .auth-tab {
    background: none;
    border: none;
    color: var(--muted);
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  
  .auth-tab:hover {
    color: var(--text);
  }
  
  .auth-tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }
`;
document.head.appendChild(style);