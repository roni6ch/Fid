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

  private cardsUrl = "http://localhost:3000/admin/card";
  private categoryUrl = "http://localhost:3000/admin/category";
  private businessUrl = "http://localhost:3000/admin/business";
  private offerUrl = "http://localhost:3000/admin/offer";

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
