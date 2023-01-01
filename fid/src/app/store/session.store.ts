import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AllCards, Card } from '../types/Cards';
import { Business, Category } from '../types/Category';
import { Offer } from '../types/Offer';

export interface SessionState {
   isLoading: boolean;
   isLoggedIn: boolean;
   user: any;
   business: Business[];
   businessByCategory: Business[];
   categories: Category[];
   allCards: AllCards;
   offersByUserCards: Offer[];
   offersNotByUserCards: Offer[];
   userCards: Card[];
}

export function createInitialState(): SessionState {
  return {
    isLoading: true,
    isLoggedIn: true,
    user: {},
    business: [],
    businessByCategory: [],
    categories: [],
    allCards: {
      cards: []
    },
    offersByUserCards: [],
    offersNotByUserCards: [],
    userCards: []
  };
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
