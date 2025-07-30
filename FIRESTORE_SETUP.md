# Firestore Database Setup Guide

## Overview
This guide will help you set up Firestore database for your Problinx app with proper security rules and data structure.

## 🔥 Firestore Configuration

### 1. Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **"problinx-app"** project
3. Go to **Firestore Database** in the left sidebar
4. Click **"Create database"**
5. Choose **"Start in test mode"** for development (we'll add security rules later)
6. Select a location (choose the closest to your users)
7. Click **"Done"**

### 2. Deploy Security Rules
1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the default rules with the rules from `firestore.rules`
3. Click **"Publish"**

### 3. Database Structure
Your Firestore database will have the following collections:

```
problinx-app/
├── users/
│   └── {userId}/
│       ├── displayName
│       ├── email
│       ├── photoURL
│       ├── createdAt
│       ├── updatedAt
│       ├── isPartner
│       ├── bio
│       └── skills[]
├── problems/
│   └── {problemId}/
│       ├── title
│       ├── description
│       ├── category
│       ├── difficulty
│       ├── createdBy
│       ├── createdAt
│       ├── updatedAt
│       ├── status
│       ├── tags[]
│       ├── budget
│       └── deadline
│       └── solutions/
│           └── {solutionId}/
│               ├── title
│               ├── description
│               ├── createdBy
│               ├── createdAt
│               ├── updatedAt
│               ├── status
│               ├── price
│               └── estimatedTime
├── partner-applications/
│   └── {applicationId}/
│       ├── userId
│       ├── companyName
│       ├── description
│       ├── website
│       ├── contactEmail
│       ├── phone
│       ├── status
│       ├── createdAt
│       └── updatedAt
├── chats/
│   └── {chatId}/
│       ├── participants[]
│       ├── createdAt
│       └── messages/
│           └── {messageId}/
│               ├── content
│               ├── senderId
│               ├── senderName
│               ├── createdAt
│               ├── type
│               └── fileUrl
├── public/
│   └── {documentId}/
│       └── (public content)
├── admin/
│   └── {documentId}/
│       └── (admin-only content)
└── analytics/
    └── {documentId}/
        └── (analytics data)
```

## 🔒 Security Rules Explanation

### Default Rule
```javascript
match /{document=**} {
  allow read, write: if false;
}
```
- **Purpose**: Denies all access by default for security
- **Effect**: No one can read or write unless explicitly allowed

### User Profiles
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
  allow create: if request.auth != null && request.auth.uid == userId;
}
```
- **Purpose**: Users can only access their own profile
- **Effect**: User can read/write only their own user document

### Problems (Public Read, Authenticated Write)
```javascript
match /problems/{problemId} {
  allow read: if true; // Public read access
  allow write: if request.auth != null && 
    (resource.data.userId == request.auth.uid || 
     request.auth.uid == resource.data.createdBy);
  allow create: if request.auth != null;
}
```
- **Purpose**: Anyone can read problems, only creators can modify
- **Effect**: Public visibility, authenticated users can create, creators can edit

### Solutions
```javascript
match /problems/{problemId}/solutions/{solutionId} {
  allow read: if true; // Public read access
  allow write: if request.auth != null && 
    resource.data.userId == request.auth.uid;
  allow create: if request.auth != null;
}
```
- **Purpose**: Public read access, only solution creators can modify
- **Effect**: Anyone can view solutions, creators can edit their own

### Partner Applications
```javascript
match /partner-applications/{applicationId} {
  allow read, write: if request.auth != null && 
    resource.data.userId == request.auth.uid;
  allow create: if request.auth != null;
}
```
- **Purpose**: Users can only access their own applications
- **Effect**: Private applications, only applicant can view/edit

### Admin Access
```javascript
match /admin/{document=**} {
  allow read, write: if request.auth != null && 
    request.auth.token.admin == true;
}
```
- **Purpose**: Only admin users can access admin content
- **Effect**: Requires admin custom claim on user token

## 🛠️ Using Firestore in Your App

### Import the Service
```typescript
import { 
  userService, 
  problemService, 
  solutionService, 
  partnerService, 
  chatService 
} from '../services/firestoreService';
```

### User Profile Operations
```typescript
// Get user profile
const profile = await userService.getUserProfile(userId);

// Create/update user profile
await userService.createUserProfile({
  uid: userId,
  displayName: 'John Doe',
  email: 'john@example.com',
  isPartner: false
});

// Update user profile
await userService.updateUserProfile(userId, {
  bio: 'Software developer',
  skills: ['React', 'TypeScript', 'Firebase']
});
```

### Problem Operations
```typescript
// Get all problems
const problems = await problemService.getProblems(20);

// Get problems by category
const webProblems = await problemService.getProblemsByCategory('web-development');

// Create new problem
const problemId = await problemService.createProblem({
  title: 'Need React Developer',
  description: 'Looking for a React developer...',
  category: 'web-development',
  difficulty: 'medium',
  createdBy: userId,
  status: 'open',
  tags: ['react', 'frontend', 'javascript']
});

// Update problem
await problemService.updateProblem(problemId, {
  status: 'in-progress'
});
```

### Solution Operations
```typescript
// Get solutions for a problem
const solutions = await solutionService.getSolutionsForProblem(problemId);

// Create solution
const solutionId = await solutionService.createSolution(problemId, {
  title: 'Complete React Solution',
  description: 'I can help you with this...',
  createdBy: userId,
  status: 'pending',
  price: 500,
  estimatedTime: '2 weeks'
});
```

### Partner Application Operations
```typescript
// Create partner application
const applicationId = await partnerService.createPartnerApplication({
  userId: userId,
  companyName: 'Tech Solutions Inc',
  description: 'We provide web development services...',
  contactEmail: 'contact@techsolutions.com',
  status: 'pending'
});
```

## 📊 Data Types and Validation

### User Profile
```typescript
interface UserProfile {
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
```

### Problem
```typescript
interface Problem {
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
```

### Solution
```typescript
interface Solution {
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
```

## 🔧 Development Setup

### 1. Install Firebase CLI (Optional)
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
```

### 2. Local Development
```bash
# Start local emulator
firebase emulators:start --only firestore

# Deploy rules to local emulator
firebase deploy --only firestore:rules --project your-project-id
```

### 3. Production Deployment
```bash
# Deploy rules to production
firebase deploy --only firestore:rules

# Deploy entire project
firebase deploy
```

## 🚨 Important Security Notes

1. **Never expose API keys** in client-side code
2. **Always validate data** on both client and server
3. **Use security rules** to enforce access control
4. **Monitor usage** to prevent abuse
5. **Backup data** regularly
6. **Test security rules** thoroughly

## 📈 Performance Optimization

1. **Index your queries** - Firestore will suggest indexes
2. **Use pagination** for large datasets
3. **Cache frequently accessed data**
4. **Use compound queries** efficiently
5. **Monitor query performance**

## 🎯 Next Steps

1. **Deploy security rules** to your Firebase project
2. **Test database operations** using the service functions
3. **Create indexes** for your queries
4. **Set up monitoring** and alerts
5. **Implement caching** strategies

Your Firestore database is now ready to use with proper security rules and comprehensive service functions! 🔥 