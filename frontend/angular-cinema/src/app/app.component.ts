import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { TranslateService } from '@ngx-translate/core';

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
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCinemaRoomPage = event.urlAfterRedirects.includes('/cinema-room');
        this.isTicketSelectionPage = event.urlAfterRedirects.includes('/ticket-selection')
      }
    });
    const lang = localStorage.getItem('language') || 'pl'; 
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
