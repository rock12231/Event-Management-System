import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    public fauth: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    // const user = this.fauth.userData
    // if (!user) {
    //   this.router.navigate(['/']);
    // }\
    console.log('login component');
  }

  login() {
    this.fauth.logInWithGoogle();
    console.log('login');
  }

}
