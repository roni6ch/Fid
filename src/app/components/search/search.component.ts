import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SessionStore } from 'src/app/store/session.store';
import { Business } from 'src/app/types/Category';
import { DialogType } from 'src/app/types/Dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  business: Business[] = [];
  searchForm = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  constructor(private sessionStore: SessionStore, public dialog: MatDialog, private api: ApiService) {}

  async ngOnInit() {
    this.handleSearch();
    this.api.getBusiness().subscribe(business => {
      this.business = business;
      this.sessionStore.update(() => {
        return {
          isLoading: false,
          business
        }
      })
    })
  }

  handleSearch() {
    this.filteredOptions = this.searchForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    return this.business.map(b => b.name)?.filter(option => option.toLowerCase().includes(value.toLowerCase()));
  }

  goToOffer(value: any) {
    const business = this.business.find(business => business.name === value);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: DialogType.OFFERS,
        businessId: business?._id
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
