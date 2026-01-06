import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Session Context
const SessionContext = createContext(null);

// Session storage keys
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  REMEMBER_ME: 'remember_me'
};

/**
 * SessionProvider - Manages user session state across the app
 */
export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize session from storage on mount
  useEffect(() => {
    initializeSession();
  }, []);

  // Update authenticated state when user/token changes
  useEffect(() => {
    setIsAuthenticated(!!(user && token));
  }, [user, token]);

  /**
   * Initialize session from stored data
   */
  const initializeSession = async () => {
    try {
      const storedToken = getStoredToken();
      const storedUser = getStoredUser();

      if (storedToken && storedUser) {
        // Verify token is still valid
        const isValid = await verifyStoredToken(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          // Token expired, clear storage
          clearSession();
        }
      }
    } catch (error) {
      console.error('Session initialization error:', error);
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify if stored token is still valid
   */
  const verifyStoredToken = async (token) => {
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  };

  /**
   * Get stored token from memory (not using localStorage in artifacts)
   */
  const getStoredToken = () => {
    // In a real app: return localStorage.getItem(STORAGE_KEYS.TOKEN);
    return token;
  };

  /**
   * Get stored user from memory
   */
  const getStoredUser = () => {
    // In a real app: 
    // const stored = localStorage.getItem(STORAGE_KEYS.USER);
    // return stored ? JSON.parse(stored) : null;
    return user;
  };

  /**
   * Store session data
   */
  const storeSession = (userData, authToken, rememberMe = false) => {
    setUser(userData);
    setToken(authToken);

    // In a real app, you'd store in localStorage:
    // if (rememberMe) {
    //   localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    //   localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    //   localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
    // } else {
    //   sessionStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    //   sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    // }
  };

  /**
   * Clear session data
   */
  const clearSession = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // In a real app:
    // localStorage.removeItem(STORAGE_KEYS.TOKEN);
    // localStorage.removeItem(STORAGE_KEYS.USER);
    // localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    // sessionStorage.clear();
  };

  /**
   * Login - Store session after successful authentication
   */
  const login = (userData, authToken, rememberMe = false) => {
    storeSession(userData, authToken, rememberMe);
    return true;
  };

  /**
   * Logout - Clear session
   */
  const logout = () => {
    clearSession();
    return true;
  };

  /**
   * Update user data
   */
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // In a real app:
    // const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    // if (rememberMe) {
    //   localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    // } else {
    //   sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    // }
  };

  /**
   * Refresh token
   */
  const refreshToken = async () => {
    try {
      // In a real app, call your refresh token API
      // const response = await fetch('/api/auth/refresh', {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      // setToken(data.token);
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  /**
   * Check if user has specific role/permission
   */
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role) => {
    if (!user || !user.role) return false;
    return user.role === role;
  };

  /**
   * Get session duration (in minutes)
   */
  const getSessionDuration = () => {
    if (!token) return 0;
    
    try {
      const decoded = JSON.parse(atob(token));
      const remaining = decoded.exp - Date.now();
      return Math.floor(remaining / 1000 / 60); // Convert to minutes
    } catch {
      return 0;
    }
  };

  const value = {
    // State
    user,
    token,
    loading,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    updateUser,
    refreshToken,
    clearSession,
    
    // Utilities
    hasPermission,
    hasRole,
    getSessionDuration
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

/**
 * useSession hook - Access session context
 */
export function useSession() {
  const context = useContext(SessionContext);
  
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  
  return context;
}

/**
 * withSession HOC - Wrap components that need session
 */
export function withSession(Component) {
  return function SessionComponent(props) {
    const session = useSession();
    return <Component {...props} session={session} />;
  };
}

/**
 * RequireAuth - Component that requires authentication
 */
export function RequireAuth({ children, fallback = null }) {
  const { isAuthenticated, loading } = useSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Please log in to continue</div>
      </div>
    );
  }

  return children;
}

/**
 * SessionManager - Utility component for debugging/monitoring
 */
export function SessionManager() {
  const session = useSession();

  if (!session.isAuthenticated) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">No active session</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold mb-2">Session Info</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-600">User:</span>{' '}
          <span className="font-medium">{session.user?.username}</span>
        </div>
        <div>
          <span className="text-gray-600">Email:</span>{' '}
          <span className="font-medium">{session.user?.email}</span>
        </div>
        <div>
          <span className="text-gray-600">Session expires in:</span>{' '}
          <span className="font-medium">{session.getSessionDuration()} minutes</span>
        </div>
        <div>
          <span className="text-gray-600">Authenticated:</span>{' '}
          <span className={`font-medium ${session.isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
            {session.isAuthenticated ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
      <button
        onClick={session.logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default {
  SessionProvider,
  useSession,
  withSession,
  RequireAuth,
  SessionManager
};