import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Types for Firestore documents
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPartner: boolean;
  bio?: string;
  skills?: string[];
}

export interface Problem {
  id?: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'open' | 'in-progress' | 'solved';
  tags: string[];
  budget?: number;
  deadline?: Timestamp;
}

export interface Solution {
  id?: string;
  problemId: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'pending' | 'accepted' | 'rejected';
  price?: number;
  estimatedTime?: string;
}

export interface ChatMessage {
  id?: string;
  chatId: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: Timestamp;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
}

export interface PartnerApplication {
  id?: string;
  userId: string;
  companyName: string;
  description: string;
  website?: string;
  contactEmail: string;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User Profile Operations
export const userService = {
  // Get user profile
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { uid, ...docSnap.data() } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  // Create or update user profile
  async createUserProfile(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const docRef = doc(db, 'users', profile.uid);
      await updateDoc(docRef, {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

// Problem Operations
export const problemService = {
  // Get all problems
  async getProblems(limitCount: number = 20): Promise<Problem[]> {
    try {
      const q = query(
        collection(db, 'problems'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Problem[];
    } catch (error) {
      console.error('Error getting problems:', error);
      throw error;
    }
  },

  // Get problems by category
  async getProblemsByCategory(category: string): Promise<Problem[]> {
    try {
      const q = query(
        collection(db, 'problems'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Problem[];
    } catch (error) {
      console.error('Error getting problems by category:', error);
      throw error;
    }
  },

  // Get problem by ID
  async getProblemById(problemId: string): Promise<Problem | null> {
    try {
      const docRef = doc(db, 'problems', problemId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Problem;
      }
      return null;
    } catch (error) {
      console.error('Error getting problem:', error);
      throw error;
    }
  },

  // Create new problem
  async createProblem(problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'problems'), {
        ...problem,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating problem:', error);
      throw error;
    }
  },

  // Update problem
  async updateProblem(problemId: string, updates: Partial<Problem>): Promise<void> {
    try {
      const docRef = doc(db, 'problems', problemId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating problem:', error);
      throw error;
    }
  },

  // Delete problem
  async deleteProblem(problemId: string): Promise<void> {
    try {
      const docRef = doc(db, 'problems', problemId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting problem:', error);
      throw error;
    }
  }
};

// Solution Operations
export const solutionService = {
  // Get solutions for a problem
  async getSolutionsForProblem(problemId: string): Promise<Solution[]> {
    try {
      const q = query(
        collection(db, 'problems', problemId, 'solutions'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Solution[];
    } catch (error) {
      console.error('Error getting solutions:', error);
      throw error;
    }
  },

  // Create solution
  async createSolution(problemId: string, solution: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'problems', problemId, 'solutions'), {
        ...solution,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating solution:', error);
      throw error;
    }
  },

  // Update solution
  async updateSolution(problemId: string, solutionId: string, updates: Partial<Solution>): Promise<void> {
    try {
      const docRef = doc(db, 'problems', problemId, 'solutions', solutionId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating solution:', error);
      throw error;
    }
  }
};

// Partner Application Operations
export const partnerService = {
  // Get partner applications
  async getPartnerApplications(): Promise<PartnerApplication[]> {
    try {
      const q = query(
        collection(db, 'partner-applications'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PartnerApplication[];
    } catch (error) {
      console.error('Error getting partner applications:', error);
      throw error;
    }
  },

  // Create partner application
  async createPartnerApplication(application: Omit<PartnerApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'partner-applications'), {
        ...application,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating partner application:', error);
      throw error;
    }
  },

  // Update partner application
  async updatePartnerApplication(applicationId: string, updates: Partial<PartnerApplication>): Promise<void> {
    try {
      const docRef = doc(db, 'partner-applications', applicationId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating partner application:', error);
      throw error;
    }
  }
};

// Chat Operations
export const chatService = {
  // Get chat messages
  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    try {
      const q = query(
        collection(db, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
    } catch (error) {
      console.error('Error getting chat messages:', error);
      throw error;
    }
  },

  // Send message
  async sendMessage(chatId: string, message: Omit<ChatMessage, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'chats', chatId, 'messages'), {
        ...message,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}; 