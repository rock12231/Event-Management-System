import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  user: any;
  isNotificationsVisible: boolean = false;
  notifications = [
    {
      title: 'New Message',
      message: 'You have new message from John.',
      time: new Date(),
      icon: 'bi bi-envelope',
    },
    {
      title: 'New Event',
      message: 'Participate in the annual event.',
      time: new Date(),
      icon: 'bi bi-calendar-event',
    }
  ];
  unreadNotificationsCount = this.notifications.length;

  constructor(private elRef: ElementRef, private renderer: Renderer2, public fauth: FirebaseService,) {
    // Add a click listener to the document
    this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  toggleNotifications() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }

  // Check if the click happened outside the notification dropdown
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isNotificationsVisible) {
      this.isNotificationsVisible = false;
    }
  }

  ngOnDestroy(): void {
    // Remove event listeners if necessary
  }

}
