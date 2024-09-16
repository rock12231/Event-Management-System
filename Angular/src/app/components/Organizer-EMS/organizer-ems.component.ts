import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { MailService } from '../../shared/services/mail.service';

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
  user : any

  constructor(
    private fb: FormBuilder, 
    private eventService: EventService,
    private mailService: MailService
  ) {
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
      this.events = await this.eventService.getAllEvents(100,this.user.uid);
      console.log('Events:', this.events);  // Now this will log only the event values
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  async sendEventCreated() {
    const eventData = {
      email: 'recipient@example.com',
      name: 'John Doe',
      event_title: 'Annual Gala',
      event_date: '2024-12-15',
      event_location: 'City Hall'
    };

    try {
      const response$ = await this.mailService.sendEventCreatedMail(eventData);
      response$.subscribe(response => {
        console.log('Event Created Mail Sent', response);
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }



  // Function to create an event
  createEvent() {
    const eventData = this.eventForm.value;
    this.eventService.createEvent(eventData)
      .then(() => {
        this.sendEventCreated();
        console.log('Event creation initiated')})
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
