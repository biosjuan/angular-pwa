import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image, ServicesService, User } from './services/services.service';
import { Observable } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { Notification } from './services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-pwa';
  user1!: User;
  image1!: Image;

  readonly VAPID_PUBLIC_KEY =
    'BO4Jby-cjY3if0B4THZgHTQG1FKTgzuASQANrrBFWyoSPxrsiwD7OXKQ2LW35IXyfxEeX-7YzbE0Tszl4bgdRp8';

  constructor(private service: ServicesService, private swPush: SwPush) {
    this.user1 = { email: '', id: 0, name: '', username: '' };
    this.image1 = { albumId: 0, thumbnailUrl: '', id: 0, title: '' };
  }

  getImage(): void {
    this.service.getPhoto().subscribe((res) => {
      this.image1 = res;
    });
  }

  getUser(): void {
    this.service.getUser().subscribe((res) => {
      console.log(res);
      this.user1 = res;
    });
  }

  onClearImage(): void {
    this.image1 = { albumId: 0, thumbnailUrl: '', id: 0, title: '' };
  }

  onClearUser(): void {
    this.user1 = { email: '', id: 0, name: '', username: '' };
  }

  async subscribeToNotifications() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });

      this.service.addSubscription(sub).subscribe({
        complete: () => {
          console.log('Sent push subscription object to server', sub);
        },
        error: (err) =>
          console.log(
            'Could not send subscription object to server, reason',
            err.message
          ),
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      console.log('finally');
    }
  }

  sendNewsletter() {
    const newsletter: Partial<Notification> = {
      title: 'Accenture News',
      body: 'Angular Rocks! 👍',
    };
    this.service.sentNotification(newsletter).subscribe();
  }
}
