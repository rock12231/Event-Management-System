import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { CommonModule } from '@angular/common';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-admin-ems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-ems.component.html',
  styleUrl: './admin-ems.component.css'
})
export class AdminEMSComponent {

  // eventForm: FormGroup;
  allList: any
  events: any

  constructor(
    private fb: FormBuilder, 
    private adminService: AdminService,
    private toast: ToastAlertService,
    private eventService: EventService
  ) {
    // this.eventForm = this.fb.group({
    //   title: [''],
    //   description: [''],
    //   startDate: [''],
    //   startTime: [''],
    //   endDate: [''],
    //   endTime: ['']
    // });
  }


  async ngOnInit() {
    this.getDate()
    this.getAllEvents()
  }

  async getDate() {
    try {
      this.allList = await this.adminService.getUsers(100);
      console.log('Events:', this.allList);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  editRole(user: any, role: string) {
    console.log(role)
    this.adminService.editRole(user, role)
      .then(() => {
        this.getDate()
        this.toast.showToast('Role updated successfully '+user.displayName, 'success')
      })
      .catch(err => console.error('Error editing role:', err));
  }

  async getAllEvents() {
    this.events = await this.eventService.getAllEvents(100)
    console.log('Events:', this.events)
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
