import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-ems',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './organizer-ems.component.html',
  styleUrl: './organizer-ems.component.css'
})
export class OrganizerEMSComponent {

  eventForm: FormGroup;
  events: any

  constructor(private fb: FormBuilder, private eventService: EventService) {
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

  // Function to create an event
  createEvent() {
    const eventData = this.eventForm.value;
    this.eventService.createEvent(eventData)
      .then(() => console.log('Event creation initiated'))
      .catch(err => console.error('Error creating event:', err));
  }

  deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId)
      .then(() => console.log('Event deleted successfully'))
      .catch(err => console.error('Error deleting event:', err));
  }

  editEvent(eventId: string) {
    this.eventService.getEvent(eventId)
      .then(() => console.log('Event edited successfully'))
      .catch(err => console.error('Error editing event:', err));
  }



}
