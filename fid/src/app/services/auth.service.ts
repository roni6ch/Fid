import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { loginUserResponse, User } from '../types/User';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  api = location.hostname.includes('localhost') ? "http://localhost:3000/api" : "https://fid.onrender.com/api";
  private authUrl = `${this.api}/login`;

  constructor(private http: HttpClient,
    private _router: Router) {
     }

  async loginUser(user: User): Promise<loginUserResponse> {
    return await firstValueFrom(this.http.post<any>(this.authUrl, user));
  }

  logoutUser() {
    this.isLoginSubject.next(false);
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

   hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
