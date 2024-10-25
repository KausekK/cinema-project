import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';


  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, registerRequest);
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, authenticationRequest, { headers })
    .pipe(
      tap(response => {
        localStorage.setItem('userToken', response.token);
      })
    );;
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('userToken') !== null;
  }
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthenticationRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  token: string;
}
