import { Injectable } from '@angular/core';
import { Database, push, ref } from '@angular/fire/database';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  user: any;

  constructor(private router: Router, private db: Database, private authService: AuthService) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  initLogListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const navigation = event as NavigationEnd; 

      if (this.user) {
        this.logNavigation(this.user.uid, navigation.urlAfterRedirects);
      }
    });
  }

  logNavigation(userId: string, url: string) {
    const logRef = ref(this.db, `users/${userId}/Logs`);
    const timestamp = new Date().toISOString();

    const logData = {
      url: "https://event-management-system-da757.web.app"+url,
      timestamp: timestamp
    };

    push(logRef, logData);
  }
}
