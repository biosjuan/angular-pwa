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
}

/*
"dataGroups": This is an array of data groups. Data groups are used to define how the service worker should handle network requests to specific URLs, typically related to data or API calls.

"name": "test-api": This is the name of the data group. It's a user-defined identifier that you can use to refer to this group elsewhere in your service worker configuration.

"urls": ["https://jsonplaceholder.typicode.com/photos/1"]: This specifies an array of URLs that belong to the data group. In this case, it includes a single URL, which is https://jsonplaceholder.typicode.com/photos/1.

"cacheConfig": This is an object that configures how the data group's data should be cached and managed by the service worker.

"strategy": "freshness": This sets the caching strategy for the data group. "Freshness" means that the service worker will fetch the data from the network and update the cache if the data is older than the specified "maxAge".

"maxAge": "1h": This defines the maximum allowable age of cached data in this data group. In this case, it's set to 1 hour ("1h"). If the cached data is older than 1 hour, the service worker will fetch a fresh copy from the network.

"maxSize": 20: This specifies the maximum number of items that can be cached in this data group. It limits the cache size to 20 items.

"timeout": "5s": This sets a timeout for how long the service worker should wait for a network response. If a network request takes longer than 5 seconds, the service worker may consider it timed out and potentially serve cached data.
*/
