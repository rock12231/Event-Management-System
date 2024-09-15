import { Injectable } from '@angular/core';
import { Database, get, limitToLast, push, query, ref, set, update } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  user: any;

  constructor(
    private db: Database,
    private fauth: FirebaseService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  // Function to create event (only for Organizer role)
  async createEvent(eventData: any): Promise<void> {
    const currentUser = await this.fauth.userData
    if (currentUser) {
      const uid = currentUser.uid;
      // Check if the user has the 'Organizer' role
      const isOrganizer = await this.fauth.isRole(uid, 'organizer');
      if (isOrganizer) {
        const eventRef = ref(this.db, `events/${uid}`);
        const newEvent = {
          title: eventData.title,
          description: eventData.description,
          startDate: eventData.startDate,
          startTime: eventData.startTime,
          endDate: eventData.endDate,
          endTime: eventData.endTime,
          organizer: uid,
          createdAt: new Date().toISOString(),
        };
        await push(eventRef, newEvent);
        console.log('Event created successfully');
      } else {
        console.error('You are not authorized to create events');
      }
    }
  }

  // Function to get a specific event by event ID
  async getEvent(eventId: string): Promise<any> {
    const currentUser = await this.fauth.userData
    const uid = currentUser.uid;
    const eventRef = ref(this.db, `events/${uid}/${eventId}`);
    return get(eventRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No data available for this event');
        }
      })
      .catch((error) => {
        console.error('Error getting event:', error);
      });
  }

  // Function to retrieve all events (limited by a query)
  async getAllEvents(limit: number): Promise<any[]> {
    const currentUser = await this.fauth.userData
    const uid = currentUser.uid;
    if (!uid) {
      console.error('User is not authenticated');
      return [];
    }
    const eventRef = ref(this.db, `events/${uid}`);
    const queryRef = query(eventRef, limitToLast(limit));
    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
      const events = snapshot.val();

      // Convert the object into an array with the format { eventId, ...eventDetails } also add userId

      return Object.keys(events).map((eventId) => {
        return {
          eventId,
          ...events[eventId],
          userId: uid,
        };
      });
    } else {
      console.log('No data available for events');
      return [];
    }
  }

  // Function to update an event
  async updateEvent(eventId: string, updatedData: any): Promise<void> {
    const currentUser = await this.fauth.userData
    const uid = currentUser.uid;
    const eventRef = ref(this.db, `events/${uid}/${eventId}`);
    return update(eventRef, updatedData)
      .then(() => {
        console.log('Event updated successfully');
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  }

  deleteEvent(eventId: string): Promise<void> {
    const eventRef = ref(this.db, `events/${eventId}`);
    return set(eventRef, null)
      .then(() => {
        console.log('Event deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  }


  joinEvent(eventId: string): Promise<void> {
    const currentUser = this.fauth.userData;
    if (currentUser) {
      const uid = currentUser.uid;
      const eventRef = ref(this.db, `events/${eventId}/participants/${uid}`);
      return set(eventRef, true)
        .then(() => {
          console.log('Event joined successfully');
        })
        .catch((error) => {
          console.error('Error joining event:', error);
        });
    } else {
      console.error('User is not authenticated');
      return Promise.reject('User is not authenticated');
    }
  }

}