import { auth } from '../services/firebase';

export const SessionManager = {
  SESSION_DURATION: 4 * 60 * 60 * 1000,
  
  initSession: async () => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('sessionStart', Date.now().toString());
      localStorage.setItem('authToken', token);
    }
  },

  checkSession: () => {
    const sessionStart = localStorage.getItem('sessionStart');
    if (!sessionStart) return false;
    
    const sessionAge = Date.now() - parseInt(sessionStart);
    return sessionAge < SessionManager.SESSION_DURATION;
  },

  refreshSession: async () => {
    const user = auth.currentUser;
    if (user) {
      await user.getIdToken(true);
      localStorage.setItem('sessionStart', Date.now().toString());
    }
  },

  clearSession: () => {
    localStorage.removeItem('sessionStart');
    localStorage.removeItem('authToken');
    auth.signOut();
  }
}; 