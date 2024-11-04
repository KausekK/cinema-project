import { MoviesService } from './services/movies.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Importy komponentów
import { HomePageComponent } from './components/home-page/home-page.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { MoveDetailsComponent } from './components/move-details/move-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CinemaRoomComponent } from './components/cinema-room/cinema-room.component';
import { TicketSelectionComponent } from './components/ticket-selection/ticket-selection.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UsersManagementComponent } from './components/admin-dashboard/users-management/users-management.component';
import { RemoveAdminDialogComponent } from './components/admin-dashboard/users-management/remove-admin-dialog/remove-admin-dialog.component';
import { AddAdminDialogComponent } from './components/admin-dashboard/users-management/add-admin-dialog/add-admin-dialog.component';
import { ShowManagementComponent } from './components/admin-dashboard/show-management/show-management.component';

// Importy modułów Angular Material i innych
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

// Importy dla ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Import dla AuthGuard
import { AuthGuard } from './guards/auth-guard.guard';

// Funkcja do tworzenia TranslateLoadera
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
  },
};

const routes: Routes = [
  { path: 'main', component: HomePageComponent },
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'upcoming', component: UpcomingMoviesComponent },
  { path: 'pricing', component: PriceListComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'movie-details/:title', component: MoveDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cinema-room', component: CinemaRoomComponent, canActivate: [AuthGuard] },
  { path: 'ticket-selection', component: TicketSelectionComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'users-management', component: UsersManagementComponent, canActivate: [AuthGuard]},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RepertoireComponent,
    UpcomingMoviesComponent,
    PriceListComponent,
    PromotionsComponent,
    MoveDetailsComponent,
    RegisterComponent,
    LoginComponent,
    CinemaRoomComponent,
    TicketSelectionComponent,
    CheckoutComponent,
    AdminDashboardComponent,
    UsersManagementComponent,
    RemoveAdminDialogComponent,
    AddAdminDialogComponent,
    ShowManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    YouTubePlayerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    MoviesService,
    AuthGuard,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
