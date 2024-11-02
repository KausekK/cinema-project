import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Diamond Cinema';

  isCinemaRoomPage: boolean = false;
  isTicketSelectionPage: boolean = false;

  constructor(private router: Router, 
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCinemaRoomPage = event.urlAfterRedirects.includes('/cinema-room');
        this.isTicketSelectionPage = event.urlAfterRedirects.includes('/ticket-selection')
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // isAdmin(){
  //   this.userService.getDynamicAdminsFilter().subscribe()
  // }
}
