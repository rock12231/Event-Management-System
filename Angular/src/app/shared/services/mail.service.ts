import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

 
  private apiUrl = environment.apiUrl;  

  constructor(private http: HttpClient, private authService : FirebaseService) { }

  // Helper function to prepare common headers with Authorization
  private async getHeaders(): Promise<HttpHeaders> {
    const token = await this.authService.getAuthToken();  // Fetch the auth token from AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Function to call the created event API
  async sendEventCreatedMail(data: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.post(`${this.apiUrl}/created`, data, { headers });
  }

  // Function to call the participated event API
  async sendEventParticipatedMail(data: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.post(`${this.apiUrl}/participated`, data, { headers });
  }

  // Function to call the new event API
  async sendNewEventMail(data: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.post(`${this.apiUrl}/new`, data, { headers });
  }
}
