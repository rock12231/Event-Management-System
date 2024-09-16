import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { Database, get, ref } from '@angular/fire/database';

@Component({
  selector: 'app-user-ems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-ems.component.html',
  styleUrl: './user-ems.component.css'
})
export class UserEMSComponent {
  eventForm: FormGroup;
  events: any
  user : any

  constructor(private fb: FormBuilder, private eventService: EventService, private db: Database,) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    this.eventForm = this.fb.group({
      title: [''],
      description: [''],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: ['']
    });
  }


  async ngOnInit() {
     // Call the getAllEvents function with a limit of 100 events
     try {
      this.events = await this.eventService.getAllEvents(100);
      console.log('Events:', this.events);  // Now this will log only the event values
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }


  joinEvent(event: any) {
    const url = `${event.userId}/${event.eventId}`;
    this.eventService.joinEvent(url)
      .then(() => console.log('Event joined successfully'))
      .catch(err => console.error('Error joining event:', err));
  }

  withdrawFromEvent(event: any) {
    const url = `${event.userId}/${event.eventId}`;
    // this.eventService.withdrawFromEvent(url)
    //   .then(() => console.log('Event withdrawn successfully'))
    //   .catch(err => console.error('Error withdrawing from event:', err));
  }

}
