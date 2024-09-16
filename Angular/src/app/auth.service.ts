import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: Auth) {}

  // Sign in with Google
  async signInWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.afAuth, provider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return null;
    }
  }

  // Get Firebase auth token
  async getAuthToken(): Promise<string | null> {
    const user = this.afAuth.currentUser;
    if (user) {
      return user.getIdToken(); // Retrieves the current user's Firebase ID token
    }
    return null;
  }

}
