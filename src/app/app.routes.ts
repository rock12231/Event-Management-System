import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BaseComponent } from './components/base/base.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminEMSComponent } from './components/Admin-EMS/admin-ems.component';
import { OrganizerEMSComponent } from './components/Organizer-EMS/organizer-ems.component';
import { UserEMSComponent } from './components/User-EMS/user-ems.component';

export const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile/:profile-name', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'dashboard/admin/:profile-name', component: AdminEMSComponent, canActivate: [AuthGuard] },
      { path: 'dashboard/organizer/:profile-name', component: OrganizerEMSComponent, canActivate: [AuthGuard] },
      { path: 'dashboard/user/:profile-name', component: UserEMSComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }