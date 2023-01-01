import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SessionQuery } from 'src/app/store/session.query';
import { SessionStore } from 'src/app/store/session.store';
import { Business } from 'src/app/types/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoading: boolean | undefined;
  isLoggedIn: boolean | undefined;
  business: Business[] = [];
  searchForm = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  constructor(private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private socialAuthService: SocialAuthService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.sessionStore.update(() => {
        return {
          isLoggedIn,
        }
      })
    })
    this.sessionQuery.isLoading().subscribe(isLoading => this.isLoading = isLoading)
  }

  signOut(): void {
    this.socialAuthService.signOut();
    this.auth.logoutUser();
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

}
