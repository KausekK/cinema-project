import { MoviesService } from './services/movies.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [
  { path: 'main', component: HomePageComponent},
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'upcoming', component: UpcomingMoviesComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RepertoireComponent,
    UpcomingMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    provideAnimationsAsync(),
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
