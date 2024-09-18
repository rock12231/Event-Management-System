import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any;
  events: any

  constructor(
    public fauth: FirebaseService,
    public toastService: ToastAlertService,
    private eventService: EventService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  ngOnInit() {
    if (this.user.role === 'user') {
      this.getUserEvents()
    }
    if (this.user.role === 'organizer') {
      this.getOrganizerEvents()
    } 
    if (this.user.role === 'admin') {
      // this.getAllEvents()
      console.log('Admin')
    }
  }

  async getUserEvents() {
    this.events = await this.eventService.getUserEvents(100)
    console.log('Events:', this.events)
  }

  async getOrganizerEvents() {
    this.events = await this.eventService.getOrganizerEvents(100)
    console.log('Events:', this.events)
  }


}
