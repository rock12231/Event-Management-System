import { Injectable } from '@angular/core';
import { Database, get, limitToLast, push, query, ref, set, update } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user: any;

  constructor(
    private db: Database,
    private fauth: FirebaseService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  async getUsers(limit: number): Promise<any[]> {
    const currentUser = await this.fauth.userData;
    
    // if (currentUser.role === 'admin') { // Assuming this is required for role check
    const userRef = ref(this.db, `users/`);
    const userQuery = query(userRef, limitToLast(limit));
  
    return get(userQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersObj = snapshot.val();
          
          // Convert object into an array
          const usersArray = Object.keys(usersObj).map((userId) => ({
            userId, // Add userId to the object
            ...usersObj[userId].info // Spread the user info data
          }));
  
          return usersArray;
        } else {
          console.log('No data available');
          return [];
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        return [];
      });
    // }
  }

  async editRole(user: any, role:string): Promise<void> {
    const currentUser = await this.fauth.userData;
    // if (currentUser.role === 'admin') {
      const userRef = ref(this.db, `users/${user.userId}/info`);
      await update(userRef, { role: role });
    // } else {
    //   console.error('You are not authorized to edit roles');
    // }
  }
  

}
