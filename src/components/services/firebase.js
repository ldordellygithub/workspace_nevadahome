// ================================================
// Firebase Initialization and Authentication Script
// ================================================

// Import the Firebase SDK modules needed for this project.
// We're importing Firebase core functionality, authentication, and analytics.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration object containing keys and identifiers for your project.
// These values are specific to your Firebase project and should be kept secure.
const firebaseConfig = {
  apiKey: "AIzaSyDzC2E-Nu8PW96ZML4YgPtORyTWFc4yzWw", // Your API key for accessing Firebase services.
  authDomain: "modular-citron-363521.firebaseapp.com", // The domain used for Firebase Authentication.
  projectId: "modular-citron-363521", // Unique identifier of your Firebase project.
  storageBucket: "modular-citron-363521.appspot.com", // Google Cloud Storage bucket for file storage.
  messagingSenderId: "6518862282", // ID for Firebase Cloud Messaging (FCM) to send push notifications.
  appId: "1:6518862282:web:26bfd164e65defd06e9f33", // Unique ID for this Firebase web application.
  measurementId: "G-EKYX8HMMSH" // ID for Google Analytics; useful for tracking app usage.
};

// ===========================
// Initialize Firebase services
// ===========================

// Initialize Firebase application with the configuration object.
// This is required to set up the Firebase SDK for your app.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and link it to the initialized Firebase app.
// This service manages user authentication, allowing sign-in/sign-out functionality.
const auth = getAuth(app);

// Initialize Firebase Analytics, useful for tracking user behavior and events within the app.
// Make sure Firebase Analytics is enabled in your Firebase console if using this service.
const analytics = getAnalytics(app);

// ==============================
// Google Authentication Provider
// ==============================

// Create a new instance of the GoogleAuthProvider object.
// This allows users to sign in to the app using their Google accounts.
const provider = new GoogleAuthProvider();

/**
 * Handles user sign-in using a popup for Google authentication.
 * @returns {Promise} - Returns a promise that resolves with the user's sign-in credentials or an error.
 */
const signInWithGoogle = async () => {
  try {
    // Opens a pop-up window for the user to sign in with their Google account.
    const result = await signInWithPopup(auth, provider);
    
    // If sign-in is successful, the 'result' object contains the signed-in user's information.
    const user = result.user;
    
    console.log("User signed in successfully:", user);
    // You can now store user data, redirect, or display personalized content here.
    
    return user; // Optionally return the signed-in user object for further processing.
  } catch (error) {
    // Catch and handle any errors during sign-in (e.g., user closed the pop-up, network issues, etc.)
    console.error("Error during Google sign-in:", error);
    
    // Return an error message or rethrow the error depending on how you want to handle it in the app.
    throw new Error("Failed to sign in with Google.");
  }
};

/**
 * Signs the user out of the application.
 * @returns {Promise} - Returns a promise that resolves when the user is successfully signed out.
 */
const signOutUser = async () => {
  try {
    // Sign the user out using Firebase Auth's signOut function.
    await signOut(auth);
    
    console.log("User signed out successfully.");
    // You can perform additional actions here, like redirecting the user to a login page.
  } catch (error) {
    // Catch and log any errors that occur during sign-out.
    console.error("Error during sign-out:", error);
    
    // Optionally, rethrow the error for handling in higher-level functions.
    throw new Error("Failed to sign out.");
  }
};

/**
 * Signs the user in using email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise} - Returns a promise that resolves with the user's sign-in credentials or an error.
 */
const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in with email successfully:", user);
    return user; // Devuelve el usuario autenticado
  } catch (error) {
    console.error("Error during email sign-in:", error);
    throw new Error(error.message || "Failed to sign in with email.");
  }
};

// ==============================
// Export Firebase services
// ==============================
// Export these services and functions for use in other parts of your app.
export { auth, provider, signInWithGoogle, signOutUser, signInWithEmail, analytics };
