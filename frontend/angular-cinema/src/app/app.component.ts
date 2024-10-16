import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Diamond Cinema';

  isCinemaRoomPage: boolean = false;
  isTicketSelectionPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCinemaRoomPage = event.urlAfterRedirects.includes('/cinema-room');
        this.isTicketSelectionPage = event.urlAfterRedirects.includes('/ticket-selection')
      }
    });
  }
}
