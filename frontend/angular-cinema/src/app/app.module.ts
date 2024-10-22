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

const routes: Routes = [
  { path: 'main', component: HomePageComponent },
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'upcoming', component: UpcomingMoviesComponent },
  { path: 'pricing', component: PriceListComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'movie-details/:title', component: MoveDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cinema-room', component: CinemaRoomComponent },
  { path: 'ticket-selection', component: TicketSelectionComponent },
  { path: 'checkout', component: CheckoutComponent},
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
    YouTubePlayerModule  
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
