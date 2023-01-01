import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionStore } from 'src/app/store/session.store';
import { Category } from 'src/app/types/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] | undefined;

  constructor(private sessionStore: SessionStore, private api: ApiService) { }

   ngOnInit() {
    this.api.getCategories().subscribe(categories => {
      this.categories = categories;
      this.sessionStore.update(() => {
        return {
          categories
        }
      })
    });
    }

}
