// ================================================
// Firebase Initialization and Authentication Script
// ================================================

// Importing necessary Firebase modules from the Firebase SDK.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration object containing project-specific identifiers.
// Ensure these values are kept secure and not exposed in public repositories.

// Importa variables de entorno desde el archivo .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// ===========================
// Initialize Firebase services
// ===========================

// Initialize the Firebase application with the configuration object.
// This sets up the Firebase SDK for your app, allowing you to use Firebase services.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and link it to the initialized Firebase app.
// This service manages user authentication, allowing sign-in and sign-out functionality.
const auth = getAuth(app);

// Initialize Firebase Analytics, useful for tracking user behavior and events within the app.
// Ensure Firebase Analytics is enabled in your Firebase console if you intend to use this service.
const analytics = getAnalytics(app);

// ==============================
// Google Authentication Provider
// ==============================

// Create an instance of the GoogleAuthProvider object.
// This enables users to sign in to the app using their Google accounts.
const provider = new GoogleAuthProvider();

/**
 * Handles user sign-in using a popup for Google authentication.
 * @returns {Promise} - Returns a promise that resolves with the user's sign-in credentials or an error.
 */
const signInWithGoogle = async () => {
  try {
    // Opens a pop-up window for the user to sign in with their Google account.
    const result = await signInWithPopup(auth, provider);
    // The 'result' object contains the signed-in user's information.
    const user = result.user;
    console.log("User signed in successfully:", user);
    return user; // Return the signed-in user object for further processing.
  } catch (error) {
    // Handle any errors that occur during sign-in.
    console.error("Error during Google sign-in:", error);
    throw new Error("Failed to sign in with Google.");
  }
};

/**
 * Signs the user out of the application.
 * @returns {Promise} - Returns a promise that resolves when the user is successfully signed out.
 */
const signOutUser = async () => {
  try {
    await signOut(auth); // Sign the user out using Firebase Auth's signOut function.
    console.log("User signed out successfully.");
  } catch (error) {
    // Handle any errors that occur during sign-out.
    console.error("Error during sign-out:", error);
    throw new Error("Failed to sign out.");
  }
};

/**
 * Signs the user in using email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise} - Returns a promise that resolves with the user's sign-in credentials and the JWT token or an error.
 */
const signInWithEmail = async (email, password) => {
  try {
    // Attempt to sign in the user with email and password.
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Get the user object from the sign-in credentials.
    console.log("User signed in with email successfully:", user);
    
    // Obtain the JWT token for the authenticated user.
    const token = await user.getIdToken();
    console.log('Token JWT:', token); // Log the JWT token for debugging or testing purposes.
    
    // Return both the user and token to allow further processing.
    return { user, token };
  } catch (error) {
    // Handle errors that may occur during sign-in.
    console.error("Error during email sign-in:", error);
    throw new Error(error.message || "Failed to sign in with email.");
  }
};

// ==============================
// Export Firebase services
// ==============================
// Export these services and functions for use in other parts of your app.
export { auth, provider, signInWithGoogle, signOutUser, signInWithEmail, analytics, firebaseConfig };
