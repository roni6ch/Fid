import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionStore } from 'src/app/store/session.store';
import { AllOffers, Offer } from 'src/app/types/Offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  businessId: string = "";
  allOffers: AllOffers = {
    offers: [],
    nonOffers: []
  };
  constructor(private sessionStore: SessionStore, private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.businessId = params['businessId'];
      this.allOffers = await this.api.getOffers(this.businessId);
      this.sessionStore.update(() => {
        return {
          offersByUserCards: this.allOffers.offers,
          offersNotByUserCards: this.allOffers.nonOffers
        }
      })
    });

  }
}
