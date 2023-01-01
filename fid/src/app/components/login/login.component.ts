

import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from 'src/app/store/session.store';
import { AuthService } from '../../services/auth.service';
import {  User } from '../../types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loggedIn: boolean = false;

  constructor(private sessionStore: SessionStore, private socialAuthService: SocialAuthService, private route: Router, private auth: AuthService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe(async (user) => {
      console.log(user);
      this.sessionStore.update(() => {
        return {
          user,
        }
      })
      const { firstName, email, idToken, photoUrl } = user;
      let authUser: User = {
        firstName,
        email,
        idToken,
        photoUrl
      };

      const loginUser = await this.auth.loginUser(authUser);
      if (loginUser.token) {
        this.auth.isLoginSubject.next(true);
        localStorage.setItem('token', loginUser.token)
        localStorage.setItem('user', JSON.stringify(user))
        this.route.navigate(['/home'])
      } else {
        (err: any) => console.log(err);
      }
    });
  }
  loginWithFacebook() {
    this.auth.isLoginSubject.next(true);
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.sessionStore.update(() => {
      return {
        user: {},
      }
    })
    this.socialAuthService.signOut();
    this.auth.logoutUser();
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}
