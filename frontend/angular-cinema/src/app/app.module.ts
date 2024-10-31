import { MoviesService } from './services/movies.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PriceListComponent } from './components/price-list/price-list.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MoveDetailsComponent } from './components/move-details/move-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CinemaRoomComponent } from './components/cinema-room/cinema-room.component';
import { MatIconModule } from '@angular/material/icon';
import { TicketSelectionComponent } from './components/ticket-selection/ticket-selection.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsersManagementComponent } from './components/admin-dashboard/users-management/users-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RemoveAdminDialogComponent } from './components/admin-dashboard/users-management/remove-admin-dialog/remove-admin-dialog.component';
import { AddAdminDialogComponent } from './components/admin-dashboard/users-management/add-admin-dialog/add-admin-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
  { path: 'users-management', component: UsersManagementComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
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
    AddAdminDialogComponent
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
    MatSnackBarModule  
  ],
  providers: [MoviesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
