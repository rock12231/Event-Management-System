import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastAlertService } from '../../shared/services/toast-alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user:any;

  constructor(
    public fauth: FirebaseService,
    public toastService: ToastAlertService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  ngOnInit() {
  }


}
