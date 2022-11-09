import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // usernames: string[] = ['username', 'auror', 'snape', 'azkaban'];
  // passwords: string[] = ['password', 'moody', 'severus', 'sirius'];
  // fakeUsername: string = "username";
  // fakestring = "password";

  credentials = new Map<string, string>([
    ["username", 'password' ],
    ["auror", 'moody' ],
    ["snape", 'severus' ],
    ["azkaban", 'sirius' ]
  ]);
  

  constructor() { }

  login(user: string, pass: string): Observable<any> {
    if (this.credentials.get(user) === pass) {
      localStorage.setItem("token", "my-super-secret-token-from-server");
      return of(new HttpResponse({ status: 200 }));
    } else {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
}