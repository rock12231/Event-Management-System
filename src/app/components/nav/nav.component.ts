import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../shared/services/firebase.service';
import { NavigationEnd, Router, RouterLink, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  activeRoute: string | undefined;
  user: any;
  isProfileActive: boolean = false;

  constructor(
    public fauth: FirebaseService,
    private router: Router
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
        this.isProfileActive = this.activeRoute.startsWith('/dashboard/');
      });

      // if (this.user) {
      //   this.router.navigate(['dashboard/'+this.user.role, this.user.displayName]);
      // } else {
      //   this.router.navigate(['/login']);
      // }

  }

  navHome() {
    this.router.navigate(['/']);
  }

  navDashboard() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if (this.user.role) {
      this.router.navigate(['dashboard/'+this.user.role, this.user.displayName]);
    }
  }

  navContact() {
    this.router.navigate(['/contact']); 
  }

  navAbout() {
    this.router.navigate(['/about']);
  }

  navLogin() {
    localStorage.setItem('loadProfile', JSON.stringify(this.user?.uid));
    this.router.navigate(['/login']);
  }

  navProfile() {
    this.router.navigate(['/profile', this.user?.displayName]);
  }

  logout() {
    this.fauth.logout();
    this.router.navigate(['/']);
  }

}
