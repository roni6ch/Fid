import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SessionQuery } from 'src/app/store/session.query';
import { Card } from 'src/app/types/Cards';
import { Category } from 'src/app/types/Category';
import { DialogType } from 'src/app/types/Dialog';
import { AllOffers, Offer } from 'src/app/types/Offer';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  dialogType?: string;
  businessId: string = "";
  allOffers: AllOffers = {
    offers: [],
    nonOffers: []
  };
  cardsList: Card[] = [];
  categories: Category[] | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService,
    private sessionQuery: SessionQuery) {
    console.log(this.data);
  }
  async ngOnInit() {
    if (this.data.dialogType === DialogType.OFFERS) {
      this.businessId = this.data.businessId;
      this.allOffers = await this.api.getOffers(this.businessId);
    } else if (this.data.dialogType === DialogType.CATEGORIES) {
      this.sessionQuery.getCategories().subscribe(data => { this.categories = data })
    }
  }
}
