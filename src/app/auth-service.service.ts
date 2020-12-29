import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {}

  async login(user: User) : Promise<any> {
    if (user.userName !== '' && user.password !== '' ) {

      let Usuario = {
        "Nome": user.userName,//"11234567890",
        "ChaveAcesso": user.password//"09876543211"
      };

      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');

      let payload = await this.http
        .post('http://localhost:54861/api/login', Usuario, { headers: headers })
        .toPromise();

      return payload;
    }
  }

  setLogin() {
    this.loggedIn.next(true);
  }
}
