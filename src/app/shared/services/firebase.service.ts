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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user')!);
        }
      } else {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      }
    });
  }

  logInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        this.toastService.showToast('Signed in successfully', 'success', 'top-end');
        this.handleRoleRedirect(result.user);
      })
      .catch((error) => {
        this.toastService.showToast('Error signing in', 'error', 'top-end');
        console.error('Error signing in', error);
      });
  }


   async handleRoleRedirect(user: any) {
    // check role from database and redirect to the appropriate dashboard
    const refRole = ref(this.db, `users/${user.uid}/info`);
    await get(refRole).then((snapshot) => {
      // update user variable with role
      user.role = snapshot.val().role;
    this.SetUserData(user);
      if (snapshot.exists()) {
        const userRole = snapshot.val();
        // upadate User role in local storage and interface
        user.role = userRole.role;
        localStorage.setItem('user', JSON.stringify(user));
        if (userRole.role) {
          this.router.navigate(['dashboard/'+userRole.role, user.displayName]);
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }
    // if (user.role === 'Admin') {
    //   this.router.navigate(['dashboard/admin', user.displayName]);
    // } else if (user.role === 'User') {
    //   this.router.navigate(['dashboard/user', user.displayName]);
    // } else if (user.role === 'Organizer') {
    //   this.router.navigate(['dashboard/organizer', user.displayName]);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  // }

  logInWithEmailPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.SetUserData(userCredential.user);
        this.router.navigate(['dashboard/user', userCredential.user.displayName]);
        this.toastService.showToast('Signed in successfully', 'success', 'top-end');
        // console.log('Signed in successfully', userCredential.user);
      })
      .catch((error) => {
        this.toastService.showToast('Error signing in', 'error', 'top-end');
        console.error('Error signing in', error);
      });
  }

  registerWithEmailPassword(email: string, password: string, displayName: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: displayName,
        });
        this.SetUserData(userCredential.user);
        this.router.navigate(['dashboard/user', userCredential.user.displayName]);
        this.toastService.showToast('Signed in successfully', 'success', 'top-end');
        // console.log('Signed in successfully', userCredential.user);
      })
      .catch((error) => {
        this.toastService.showToast('Error signing in', 'error', 'top-end');
        console.error('Error signing in', error);
      });
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

  logout() {
    this.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['login']);
      this.toastService.showToast('Logout successfully', 'success', 'top-end');
      this.userData = null;

    });
  }

  async SetUserData(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loadProfile', JSON.stringify(user?.uid));
    const userRef = ref(this.db, `users/${user.uid}/info`);
    //  DATE TO STRING
    const currentDate = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'User',
      emailVerified: user.emailVerified,
    };
  
    try {
      const snapshot = await get(userRef);
  
      if (!snapshot.exists()) {
        await set(userRef, {
          ...userData,
          joinAt: currentDate,
        });
      }
    } catch (error) {
      console.error('Error saving user data', error);
      console.log('Error saving user data');
    }
  }

}
