import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  backendUrl = 'http://localhost:3000';

  public createUser(user: Users): Observable<any> {
    return this.http.post(this.backendUrl + '/createUser', user)
  }

  public userLogin(user: Users): Observable<any> {
    return this.http.post(this.backendUrl + '/login', user);
  }
}
