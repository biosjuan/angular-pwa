import { Component, OnInit } from '@angular/core';
import { Image, ServicesService, User } from './services/services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';
  user1!: User;
  image1!: Image;

  constructor(private service: ServicesService) {
    this.user1 = { email: '', id: 0, name: '', username: '' };
    this.image1 = { albumId: 0, thumbnailUrl: '', id: 0, title: '' };
  }

  ngOnInit(): void {
    this.service.getPhoto().subscribe((res) => {
      console.log(JSON.stringify(res));
    });
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
}
