import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { Database, ref, set, update, get } from '@angular/fire/database';
import { ToastAlertService } from './toast-alert.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: any;

  constructor(
    private auth: Auth,
    public router: Router,
    public db: Database,
    private toastService: ToastAlertService
  ) {
    // Listen for changes in authentication state
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        // Fetch user role from Firebase Database
        const userRef = ref(this.db, `users/${user.uid}/info`);
        try {
          const snapshot = await get(userRef);  // Wait for the role to be fetched
          if (snapshot.exists()) {
            const userRole = snapshot.val();
            if (userRole.role) {
              user.role = userRole.role; // Update the user object with the role
            }
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }

        // After role is fetched, set the user data in localStorage
        this.userData = user;
        this.setLocalStorage(user);
      } else {
        this.clearLocalStorage();
      }
    });
  }


  async logInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      await this.SetUserData(user);

      const refRole = ref(this.db, `users/${user.uid}/info`);
      const snapshot = await get(refRole);
      const userRole = snapshot.val();

      if (userRole && userRole.role) {
        this.router.navigate(['dashboard/' + userRole.role, userRole.displayName || user.displayName]);
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.toastService.showToast('Error signing in', 'error', 'top-end');
      console.error('Error signing in', error);
    }
  }


  async logInWithEmailPassword(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      const user = result.user;
      await this.SetUserData(user);

      const refRole = ref(this.db, `users/${user.uid}/info`);
      const snapshot = await get(refRole);
      const userRole = snapshot.val();

      if (userRole && userRole.role) {
        this.router.navigate(['dashboard/' + userRole.role, userRole.displayName || user.displayName]);
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.toastService.showToast('Error signing in', 'error', 'top-end');
      console.error('Error signing in', error);
    }
  }

  get isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null;
    }
    return false;
  }

  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.toastService.showToast('Password reset email sent', 'success', 'top-end');
      })
      .catch((error) => {
        this.toastService.showToast('Error sending password reset email', 'error', 'top-end');
        console.error('Error sending password reset email', error);
      });
  }

  async logout() {
    await this.auth.signOut();
    this.clearLocalStorage();
    this.router.navigate(['login']);
    this.toastService.showToast('Logout successfully', 'success', 'top-end');
    this.userData = null;
  }

  async SetUserData(user: any) {
    const userRef = ref(this.db, `users/${user.uid}/info`);
    const currentDate = new Date();
    const formattedDate = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: 'user' // Default role if not found in DB
    };

    try {
      const snapshot = await get(userRef);

      // If user data doesn't exist in the database, set it
      if (!snapshot.exists()) {
        await set(userRef, {
          ...userData,
          joinAt: formattedDate,
        });
      } else {
        // If user data exists, retrieve the role and update the user object
        const dbUserData = snapshot.val();
        if (dbUserData.role) {
          userData.role = dbUserData.role; // Update the role in userData
        }
      }

      // Update the user object with the role and save it to localStorage
      const updatedUser = { ...user, role: userData.role };
      localStorage.setItem('user', JSON.stringify(updatedUser));

    } catch (error) {
      console.error('Error saving user data', error);
    }
  }

  private setLocalStorage(user: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private clearLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', 'null');
    }
  }

  // Check if a user has a specific role
  async isRole(uid: string, role: string): Promise<boolean> {
    const roleRef = ref(this.db, `users/${uid}/info/role`);
    const snapshot = await get(roleRef);
    const userRole = snapshot.val();
    if (userRole) {
      return userRole === role;
    } else {
      return false;
    }
  }

    // Get Firebase auth token
    async getAuthToken(): Promise<string | null> {
      const user = this.auth.currentUser;
      if (user) {
        return user.getIdToken();
      }
      return null;
    }

}
