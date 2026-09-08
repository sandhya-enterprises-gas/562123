import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';
import { auth, saveUserProfileToFirestore } from './firebase';
export { auth };

// Standard Google Auth Provider (for customer & agency authentication)
const standardProvider = new GoogleAuthProvider();
standardProvider.setCustomParameters({
  prompt: 'select_account'
});

// Gmail Scopes Provider (specifically for Gmail Desk and Official Correspondence)
export const gmailScopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.metadata',
  'https://www.googleapis.com/auth/gmail.insert',
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing'
];

const gmailProvider = new GoogleAuthProvider();
gmailScopes.forEach((scope) => gmailProvider.addScope(scope));
gmailProvider.setCustomParameters({
  prompt: 'select_account'
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token strictly in memory (per security guidelines)
let cachedAccessToken: string | null = null;

/**
 * Initialize auth state listener. Call this on app load.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      // Sync user profile to Firestore
      try {
        await saveUserProfileToFirestore({
          uid: user.uid,
          displayName: user.displayName || 'Commercial Partner',
          email: user.email || '',
          photoURL: user.photoURL || '',
          role: 'customer',
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('[Firebase Auth] Profile sync skipped:', err);
      }

      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthSuccess) onAuthSuccess(user, null);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Standard Google Sign-In with Firebase Auth
 * Securely identifies commercial customers, distributors, and business owners.
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string | null } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, standardProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;

    // Sync user profile into Firestore database
    await saveUserProfileToFirestore({
      uid: result.user.uid,
      displayName: result.user.displayName || 'Commercial Customer',
      email: result.user.email || '',
      photoURL: result.user.photoURL || '',
      role: 'customer',
      createdAt: new Date().toISOString()
    });

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('[Firebase Auth] Google Sign-In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Google Sign-In with Gmail Scopes (for the Official Gmail Desk)
 */
export const googleSignInWithGmail = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, gmailProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth credentials');
    }

    cachedAccessToken = credential.accessToken;

    await saveUserProfileToFirestore({
      uid: result.user.uid,
      displayName: result.user.displayName || 'Sandhya Official Staff',
      email: result.user.email || '',
      photoURL: result.user.photoURL || '',
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('[Firebase Auth] Gmail Sign-In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Access token retrieval from memory cache
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sign out and clear in-memory token
 */
export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

