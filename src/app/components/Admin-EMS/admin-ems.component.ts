import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { CommonModule } from '@angular/common';
import { ToastAlertService } from '../../shared/services/toast-alert.service';

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

  constructor(
    private fb: FormBuilder, 
    private adminService: AdminService,
    private toast: ToastAlertService
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

}
