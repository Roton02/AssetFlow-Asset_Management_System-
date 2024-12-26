import { 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.init"; // Ensure this is correctly configured

export const AuthContext = createContext(null);

const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    // Social auth providers
    const googleProvider = new GoogleAuthProvider(); // Initialize Google provider
    const githubProvider = new GithubAuthProvider(); // Note: Renamed to lowercase 'githubProvider'

    // Create new user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in user with email and password
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google sign-in
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // GitHub Sign-In
    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider);
    };

    // Logout function
    const logout = () => {
        return signOut(auth).then(() => setUser(null));
    };

    // Update profile function
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: image
        });
    };

    // Effect to track auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    // Values provided by the AuthContext
    const allValues = { 
        createUser, 
        signInUser, 
        googleLogin,  // Added googleLogin to allValues
        githubLogin, 
        logout, 
        user, 
        updateUserProfile 
    };

    return (
        <AuthContext.Provider value={allValues}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;
