import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to create/get user profile
  async function getUserProfile(uid, email, displayName) {
    try {
      console.log(`[Auth] Fetching profile for UID: ${uid}`);
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("[Auth] Profile found in Firestore.");
        return userSnap.data();
      } else {
        console.warn("[Auth] No profile found. Creating default profile...");
        const defaultProfile = {
          uid,
          email,
          name: displayName || 'Champion',
          currentWeight: 60,
          targetWeight: 75,
          height: 175,
          calorieGoal: 3000,
          waterGoal: 8,
          streak: 0,
          createdAt: new Date().toISOString(),
        };
        await setDoc(userRef, defaultProfile);
        return defaultProfile;
      }
    } catch (err) {
      console.error("[Auth] Error fetching/creating profile:", err);
      // If Firestore is offline, return basic info so the app doesn't crash
      return { uid, email, name: displayName || 'Warrior (Offline)', offline: true };
    }
  }

  async function signup(email, password, profileData) {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      const profile = {
        uid: user.uid,
        email: user.email,
        name: profileData.name || 'Champion',
        currentWeight: parseFloat(profileData.currentWeight) || 60,
        targetWeight: parseFloat(profileData.targetWeight) || 75,
        height: parseInt(profileData.height) || 175,
        calorieGoal: parseInt(profileData.calorieGoal) || 3000,
        waterGoal: parseInt(profileData.waterGoal) || 8,
        streak: 0,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), profile);
      setCurrentUser({ ...user, ...profile });
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function login(email, password) {
    setError(null);
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function googleLogin() {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  function logout() {
    return signOut(auth).then(() => {
      setCurrentUser(null);
    });
  }

  useEffect(() => {
    console.log("[Auth] Initializing onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log("[Auth] User detected:", user.email);
          const profile = await getUserProfile(user.uid, user.email, user.displayName);
          setCurrentUser({ ...user, ...profile });
        } else {
          console.log("[Auth] No user session found.");
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("[Auth] Fatal observer error:", err);
        // Ensure app doesn't stay in loading state
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }, (err) => {
      console.error("[Auth] Stream error:", err);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-accent-cyan/10 border-t-accent-cyan rounded-full animate-spin shadow-[0_0_20px_rgba(6,214,160,0.2)]" />
          <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Establishing Node Connection...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
}
