import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../types/Cards';
import { firstValueFrom } from 'rxjs';
import { Business, Category } from '../types/Category';
import { Offer } from '../types/Offer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  api = location.hostname.includes('localhost') ? "http://localhost:3000" : "https://fid.onrender.com";
  private cardsUrl = `${this.api}/admin/card`;
  private categoryUrl = `${this.api}/admin/category`;
  private businessUrl = `${this.api}/admin/business`;
  private offerUrl = `${this.api}/admin/offerUrl`;

  constructor(private http: HttpClient) { }

  async addCard(card: Card) {
    await firstValueFrom(this.http.post<Card[]>(this.cardsUrl, card));
  }
  async addCategory(category: Category) {
    await firstValueFrom(this.http.post<Card[]>(this.categoryUrl, category));
  }
  async addBusiness(business: Business) {
    await firstValueFrom(this.http.post<Card[]>(this.businessUrl, business));
  }

  async addOffer(offer: Offer) {
    await firstValueFrom(this.http.post<Card[]>(this.offerUrl, offer));
  }

}
