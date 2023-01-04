import { Injectable } from '@angular/core';
import { Query, StoreConfig } from '@datorama/akita';
import { Observable } from 'rxjs';
import { AllCards } from '../types/Cards';
import { Business, Category } from '../types/Category';
import { SessionState, SessionStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionQuery extends Query<SessionState> {
  constructor(protected override store: SessionStore) {
    super(store);
  }


  isLoggedIn(): Observable<boolean> {
    return this.select(state => state.isLoggedIn);
  }

  getUserDetails(): Observable<any> {
    return this.select(state => state.user);
  }

  isLoading(): Observable<boolean> {
    return this.select(state => state.isLoading);
  }
  getCategories(): Observable<Category[]> {
    return this.select(state => state.categories);
  }
  getBusiness(): Observable<Business[]> {
    return this.select(state => state.business);
  }
  getAllCards(): Observable<AllCards> {
    return this.select(state => state.allCards);
  }
}
