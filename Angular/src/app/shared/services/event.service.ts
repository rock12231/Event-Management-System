import { Injectable } from '@angular/core';
import { Database, get, limitToLast, push, query, ref, set, update } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';
import { ToastAlertService } from './toast-alert.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  user: any;

  constructor(
    private db: Database,
    private fauth: FirebaseService,
    private toastService: ToastAlertService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  async createEvent(eventData: any): Promise<void> {
    const currentUser = await this.fauth.userData;
    if (currentUser) {
      const uid = currentUser.uid;
      const name = currentUser.displayName;
  
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
          organizerName: name,
          createdAt: new Date().toISOString(),
        };
  
        // Push new event to Firebase
        await push(eventRef, newEvent);
  
        // Create and save a notification
        const notificationMessage = `You have successfully created the event: ${eventData.title}.`;
        await this.createNotification(uid, newEvent.title, notificationMessage);
  
        // Show success toast
        this.toastService.showToast('Event created successfully', 'success');
        console.log('Event and notification created successfully');
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
  async getAllEvents(limit: number, id?:any): Promise<any[]> {
    const currentUser = await this.fauth.userData
    const uid = currentUser.uid?currentUser.uid:this.user.uid;
    if (!uid) {
      console.error('User is not authenticated');
      return [];
    }
    const eventRef = ref(this.db, `events/`);
    const queryRef = query(eventRef, limitToLast(limit));
    const snapshot = await get(queryRef);

    console.log('Snapshot:', snapshot.val());
    if (snapshot.exists()) {
      const events = snapshot.val();

      // Convert the object into an array with the format { eventId, ...eventDetails } also add userId

      return Object.keys(events).flatMap((userId) => {
        return Object.keys(events[userId]).map((eventId) => {
          return {
            eventId,
            userId,
            ...events[userId][eventId],
          };
        });
      });
    } else {
      console.log('No data available for events');
      return [];
    }
  }


  async getOrganizerEvents(limit: number, id?: any): Promise<any[]> {
    const currentUser = await this.fauth.userData;
    const uid = this.user.uid ? this.user.uid : currentUser.uid;
    if (!uid) {
      console.error('User is not authenticated');
      return [];
    }
    
    const eventRef = ref(this.db, `events/`);
    const queryRef = query(eventRef, limitToLast(limit));
    const snapshot = await get(queryRef);
  
    console.log('Snapshot:', snapshot.val());
    if (snapshot.exists()) {
      const events = snapshot.val();
  
      // Convert the object into an array and filter events where the organizer matches the uid
      return Object.keys(events).flatMap((userId) => {
        return Object.keys(events[userId])
          .filter((eventId) => {
            const event = events[userId][eventId];
            return event.organizer === uid; // Filter for events where organizer === uid
          })
          .map((eventId) => {
            const event = events[userId][eventId];
            return {
              eventId,
              userId,
              ...event,
            };
          });
      });
    } else {
      console.log('No data available for events');
      return [];
    }
  }

  async getUserEvents(limit: number, id?: any): Promise<any[]> {
    const currentUser = await this.fauth.userData;
    const uid = this.user.uid ? this.user.uid : currentUser.uid;
    if (!uid) {
      console.error('User is not authenticated');
      return [];
    }
    
    const eventRef = ref(this.db, `events/`);
    const queryRef = query(eventRef, limitToLast(limit));
    const snapshot = await get(queryRef);
  
    console.log('Snapshot:', snapshot.val());
    if (snapshot.exists()) {
      const events = snapshot.val();
  
      // Convert the object into an array with the format { eventId, ...eventDetails } also add userId
      return Object.keys(events).flatMap((userId) => {
        return Object.keys(events[userId]).filter((eventId) => {
          const event = events[userId][eventId];
          // Check if the current user's ID is in the participants list
          return event.participants && event.participants[uid];
        }).map((eventId) => {
          const event = events[userId][eventId];
          return {
            eventId,
            userId,
            ...event,
          };
        });
      });
    } else {
      console.log('No data available for events');
      return [];
    }
  }
  
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

  async createNotification(uid: string, title: string, message: string): Promise<void> {
    const notification = {
      title,
      uid,
      message,
      timestamp: new Date().toISOString(),
      icon: 'bi bi-calendar-event',
    };
  
    const notificationsRef = ref(this.db, `notifications`);
    await push(notificationsRef, notification);
    console.log('Notification created successfully');
  }
  

}