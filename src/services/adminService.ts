import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, User } from 'firebase/auth';

// Admin user configurations
export const ADMIN_USERS = {
  'nishit08agrawal@gmail.com': {
    uid: 'pxBeTTjsHwaoPrBQx0rIfOIu0T02',
    role: 'admin',
    name: 'Nishit Agrawal'
  },
  'vivekkumargreat9@gmail.com': {
    uid: 'p4jgRpmzCDWttL7sGkttVpympvF2',
    role: 'admin',
    name: 'Vivek Kumar'
  }
};

export interface AdminUser {
  uid: string;
  role: string;
  name: string;
}

// Check if a user is an admin
export const isAdmin = (user: User | null): boolean => {
  if (!user || !user.email) return false;
  return user.email in ADMIN_USERS;
};

// Get admin user details
export const getAdminUser = (email: string): AdminUser | null => {
  return ADMIN_USERS[email as keyof typeof ADMIN_USERS] || null;
};

// Admin login function
export const adminLogin = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Verify if the user is an admin
    if (!isAdmin(user)) {
      throw new Error('Access denied. Admin privileges required.');
    }
    
    return user;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
};

// Get current admin user details
export const getCurrentAdminUser = (user: User | null): AdminUser | null => {
  if (!user || !user.email) return null;
  return getAdminUser(user.email);
}; 