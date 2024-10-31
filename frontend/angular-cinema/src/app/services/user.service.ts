import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl;


  constructor(private httpClient: HttpClient) { }

  getAdmins():Observable<any>{
    return this.httpClient.get<any>(this.url + '/user/admins');
  }

  updateRole(id: number): Observable<void> {
    const url = `${this.url}/user/update/role/${id}`;
    return this.httpClient.put<void>(url, {});
  }
  
  getDynamicAdminsFilter(email: string): Observable<string[]>{
    return this.httpClient.get<string[]>(this.url + `/user/filter?email=${email}`)
  }
 
}
