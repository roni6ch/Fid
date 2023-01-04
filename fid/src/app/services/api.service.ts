import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AllCards, Card } from '../types/Cards';
import { Category, Business } from '../types/Category';
import { AllOffers } from '../types/Offer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = location.hostname.includes('localhost') ? "http://localhost:3000/api" : "https://fid.onrender.com/api";
  private cardsUrl = `${this.api}/cards`;
  private categoriesUrl = `${this.api}/categories`;
  private businessUrl = `${this.api}/business`;
  private offersUrl = `${this.api}/offers`;

  cards = new BehaviorSubject<Card[]>([]);
  cards$ = this.cards.asObservable();
  userCards = new BehaviorSubject<string[]>([]);
  userCards$ = this.userCards.asObservable();

  constructor(private http: HttpClient) { }

  getCards(email?: string): Observable<AllCards> {
    if (email) {
      let params = new HttpParams().set("email", email);
      return this.http.get<AllCards>(this.cardsUrl, { params });
    }
    return this.http.get<{ cards: Card[] }>(this.cardsUrl);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getBusiness(): Observable<Business[]> {
    return this.http.get<Business[]>(this.businessUrl);
  }

  async getBusinessByCategoryId(categoryId: string): Promise<Business[]> {
    let params = new HttpParams().set("categoryId", categoryId);
    return await firstValueFrom(this.http.get<Business[]>(this.businessUrl, { params }));
  }

  async getOffers(businessId: string): Promise<AllOffers> {
    let params = new HttpParams().set("businessId", businessId);
    return await firstValueFrom(this.http.get<AllOffers>(this.offersUrl, { params }));
  }

  async setCard(card: Card) {
    const user = localStorage.getItem('user')!;
    const { email } = JSON.parse(user);
    let payload = JSON.stringify({
      cardId: card._id,
      email
    })
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.cardsUrl, payload, { headers }).subscribe((response: any) => {
      this.userCards.next(response);
    });
  }
}
