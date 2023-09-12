import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Image {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Action {
  action: string;
  title: string;
}

interface Data {
  dateOfArrival: string;
  primaryKey: number;
}

export interface Notification {
  title: string;
  body: string;
  icon: string;
  vibrate: number[];
  data: Data;
  actions: Action[];
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/1');
  }

  getPhoto(): Observable<Image> {
    return this.http.get<Image>(
      'https://jsonplaceholder.typicode.com/photos/1'
    );
  }

  addSubscription(sub: any): Observable<any> {
    return this.http.post('/api/subscription', sub);
  }

  sentNotification(notification: Partial<Notification>) {
    return this.http.post('/api/notification', { notification });
  }
}
