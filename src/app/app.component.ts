import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page = '';
  constructor(private router: Router) {
    this.page = this.router.url;
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.page = val.url;
      }
    });
  }

  ngOnInit() {
  }

  isHomePage() {
    return this.page === '/' || this.page === '/home';
  }

}
