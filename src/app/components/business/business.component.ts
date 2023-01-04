import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionStore } from 'src/app/store/session.store';
import { Business } from 'src/app/types/Category';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {
  categoryId: string = "";
  businessByCategory: Business[] = [];
  constructor(private sessionStore: SessionStore, private api: ApiService, private route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.categoryId = params['id'];
      this.businessByCategory = await this.api.getBusinessByCategoryId(this.categoryId);
      this.sessionStore.update(() => {
        return { businessByCategory: this.businessByCategory }
      })
    });
  }

  navigateToOffers(businessId: string) {
    this._router.navigate(['/offers', businessId]);
  }
}
