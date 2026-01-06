import "./modules/auth-module/auth.js";
import initRouter from "./router.js";
import { setSessionManager } from "./pages/settings.js";

// Session state (in-memory storage for this demo)
let currentSession = {
  user: null,
  token: null,
  isAuthenticated: false
};

/**
 * Session Manager API
 * This provides the interface between your auth module and the rest of the app
 */
const sessionManager = {
  // Get current user
  get user() {
    return currentSession.user;
  },
  
  // Get current token
  get token() {
    return currentSession.token;
  },
  
  // Check if authenticated
  get isAuthenticated() {
    return currentSession.isAuthenticated;
  },

  /**
   * Initialize session (called after successful login)
   */
  login(userData, authToken, rememberMe = false) {
    currentSession.user = userData;
    currentSession.token = authToken;
    currentSession.isAuthenticated = true;

    // In a real app, store in localStorage/sessionStorage:
    // if (rememberMe) {
    //   localStorage.setItem('auth_token', authToken);
    //   localStorage.setItem('user_data', JSON.stringify(userData));
    // } else {
    //   sessionStorage.setItem('auth_token', authToken);
    //   sessionStorage.setItem('user_data', JSON.stringify(userData));
    // }

    console.log('Session initialized:', userData.username);
    
    // Emit custom event that other parts of app can listen to
    window.dispatchEvent(new CustomEvent('session:login', { 
      detail: { user: userData } 
    }));
    
    return true;
  },

  /**
   * Clear session (logout)
   */
  logout() {
    const username = currentSession.user?.username;
    
    currentSession.user = null;
    currentSession.token = null;
    currentSession.isAuthenticated = false;

    // In a real app, clear storage:
    // localStorage.removeItem('auth_token');
    // localStorage.removeItem('user_data');
    // sessionStorage.clear();

    console.log('Session cleared:', username);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('session:logout'));
    
    return true;
  },

  /**
   * Update user data
   */
  updateUser(updates) {
    if (!currentSession.user) return false;
    
    currentSession.user = { ...currentSession.user, ...updates };
    
    // In a real app, update storage:
    // const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
    // storage.setItem('user_data', JSON.stringify(currentSession.user));

    console.log('User data updated:', updates);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('session:update', { 
      detail: { user: currentSession.user } 
    }));
    
    return true;
  },

  /**
   * Verify token is still valid
   */
  verifyToken() {
    if (!currentSession.token) return false;
    
    try {
      const decoded = JSON.parse(atob(currentSession.token));
      
      // Check if token expired
      if (decoded.exp < Date.now()) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  },

  /**
   * Get session duration remaining (in minutes)
   */
  getSessionDuration() {
    if (!currentSession.token) return 0;
    
    try {
      const decoded = JSON.parse(atob(currentSession.token));
      const remaining = decoded.exp - Date.now();
      return Math.floor(remaining / 1000 / 60);
    } catch {
      return 0;
    }
  },

  /**
   * Restore session from storage (on app load)
   */
  restoreSession() {
    // In a real app, check localStorage/sessionStorage:
    // const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    // const userData = localStorage.getItem('user_data') || sessionStorage.getItem('user_data');
    
    // if (token && userData) {
    //   try {
    //     const user = JSON.parse(userData);
    //     const decoded = JSON.parse(atob(token));
    //     
    //     // Verify token not expired
    //     if (decoded.exp > Date.now()) {
    //       currentSession.user = user;
    //       currentSession.token = token;
    //       currentSession.isAuthenticated = true;
    //       console.log('Session restored:', user.username);
    //       return true;
    //     }
    //   } catch (error) {
    //     console.error('Session restoration failed:', error);
    //   }
    // }
    
    return false;
  }
};

/**
 * Initialize the application
 */
function initApp() {
  console.log('Initializing DynaBlocks...');
  
  // Try to restore previous session
  sessionManager.restoreSession();
  
  // Connect session manager to settings
  setSessionManager(sessionManager);
  
  // Initialize router
  initRouter();
  
  // Set up global navigation helper
  setupNavigationHelpers();
  
  // Set up session event listeners
  setupSessionListeners();
  
  console.log('DynaBlocks initialized!');
}

/**
 * Set up global navigation helpers
 */
function setupNavigationHelpers() {
  // Global navigation function that other modules can use
  window.navigateToPage = (page) => {
    console.log('Navigating to:', page);
    
    // Your router should handle this
    // For now, just log it
    window.location.hash = `#${page}`;
  };
  
  // Account switcher (placeholder for future feature)
  window.openAccountSwitcher = () => {
    console.log('Account switcher not yet implemented');
    alert('Account switcher coming soon!');
  };
}

/**
 * Set up listeners for session events
 */
function setupSessionListeners() {
  // Listen for login events
  window.addEventListener('session:login', (e) => {
    console.log('User logged in:', e.detail.user);
    
    // Update UI, show welcome message, etc.
    showWelcomeMessage(e.detail.user.username);
  });
  
  // Listen for logout events
  window.addEventListener('session:logout', () => {
    console.log('User logged out');
    
    // Redirect to home/login, update UI, etc.
    window.navigateToPage('home');
  });
  
  // Listen for user update events
  window.addEventListener('session:update', (e) => {
    console.log('User data updated:', e.detail.user);
  });
}

/**
 * Show welcome message after login
 */
function showWelcomeMessage(username) {
  const notification = document.createElement('div');
  notification.className = 'notification notification-success';
  notification.textContent = `Welcome back, ${username}!`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: #10b981;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Expose session manager globally for auth module to use
 */
window.SessionManager = sessionManager;

/**
 * Start the app when DOM is ready
 */
document.addEventListener("DOMContentLoaded", initApp);

/**
 * Example: How your auth module would use this
 * 
 * In src/module/auth-module/auth.js:
 * 
 * export async function login(credentials) {
 *   const result = await loginAPI(credentials);
 *   
 *   if (result.success) {
 *     // Store session
 *     window.SessionManager.login(result.user, result.token, rememberMe);
 *     
 *     // Navigate to dashboard
 *     window.navigateToPage('dashboard');
 *   }
 *   
 *   return result;
 * }
 * 
 * export function logout() {
 *   window.SessionManager.logout();
 *   window.navigateToPage('login');
 * }
 */