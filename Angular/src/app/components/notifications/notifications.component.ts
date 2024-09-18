import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnDestroy {

  user: any;
  isNotificationsVisible: boolean = false;
  notifications :any = [];
  unreadNotificationsCount = this.notifications.length;

  constructor(
    private elRef: ElementRef, 
    private renderer: Renderer2, 
    public fauth: FirebaseService, 
    private db: Database
  ) {
    // Add a click listener to the document
    this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  ngOnInit(): void {
    const currentUser = this.user; // You already have the user from localStorage
  
    if (currentUser) {
      const notificationsRef = ref(this.db, `notifications`);
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.notifications = Object.values(data);
          this.unreadNotificationsCount = this.notifications.length;
        }
      });
    }
  }

  toggleNotifications() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  
    // If notifications dropdown is now visible, mark all notifications as read
    if (this.isNotificationsVisible) {
      this.unreadNotificationsCount = 0;
    }
  }
  
  // Check if the click happened outside the notification dropdown
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isNotificationsVisible) {
      this.isNotificationsVisible = false;
    }
  }

  ngOnDestroy(): void {
    // Clean up listeners if necessary
  }
}
