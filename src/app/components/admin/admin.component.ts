import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ApiService } from 'src/app/services/api.service';
import { Card, CardType } from 'src/app/types/Cards';
import { Business, Category } from 'src/app/types/Category';
import { Offer } from 'src/app/types/Offer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  businessList: Business[] = [];
  cardsList: Card[] = [];
  offers: Offer[] = [];
  cardTypes = [CardType.REGULAR, CardType.BANK]
  addCardForm!: FormGroup;
  addCategoryForm!: FormGroup;
  addBusinessForm!: FormGroup;
  addOfferForm!: FormGroup;
  selectedBusiness: string[] = [];

  constructor(private api: ApiService, private fb: FormBuilder, private admin: AdminService) {
    this.addCardForm = this.fb.group({
      name: '',
      photoUrl: '',
      type: CardType.REGULAR
    });
    this.addCategoryForm = this.fb.group({
      name: '',
      photoUrl: '',
      businessIds: this.fb.array([]),
    })
    this.addBusinessForm = this.fb.group({
      name: '',
      photoUrl: '',
    })
    this.addOfferForm = this.fb.group({
      businessId: '',
      cardId: '',
      description: '',
      link: '',
    })
  }

  async ngOnInit() {
    this.api.getBusiness().subscribe(business => this.businessList = business)
    this.api.getCards();
    this.api.cards$.subscribe((cards) => {
      this.cardsList = cards;
    });
  }
  async onAddCardSubmit() {
    const card: Card = this.addCardForm.value;
    await this.admin.addCard(card);
  }

  async onAddCategorySubmit() {
    const category: Category = this.addCategoryForm.value;
    category.businessIds = this.selectedBusiness;
    await this.admin.addCategory(category);
    this.selectedBusiness = [];
  }

  async onAddBusinessSubmit() {
    const business: Business = this.addBusinessForm.value;
    await this.admin.addBusiness(business);
  }

  async onAddOfferSubmit() {
    const offer: Offer = this.addOfferForm.value;
    await this.admin.addOffer(offer);
  }

  addBusinessToCategory(businessIds: string[]) {
    this.selectedBusiness = businessIds;
  }
}
