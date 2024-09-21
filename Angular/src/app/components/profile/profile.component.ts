import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { Database, ref, set } from '@angular/fire/database';

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
    private eventService: EventService,
    public fileUpload: FileUploadService,
    public db: Database
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
  
  async uploadProfilePhoto(event: Event) {
    const fileInput = event.target as HTMLInputElement;  // Cast event.target to HTMLInputElement
  
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const files: FileList = fileInput.files;
      await this.fileUpload.imgUpload(files, this.user.uid).then(async (res) => {
        console.log('Profile photo uploaded successfully', res);
        const userRef = ref(this.db, `users/${this.user.uid}/info/photoURL`);
        await set(userRef, res[0]);
        this.toastService.showToast('Profile photo uploaded successfully', 'success');
        if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
          let user = JSON.parse(localStorage.getItem('user')!);
          user.photoURL = res[0];
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
        }

      }).catch((error) => {
        console.error('Upload failed', error);
        this.toastService.showToast('Profile photo upload failed', 'error');
      });
    } else {
      console.error('No file selected or file input is undefined.');
    }
  }
  
  


}
