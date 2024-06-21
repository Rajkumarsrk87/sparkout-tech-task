import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './service/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app';

  constructor(
    public userDataService: UserDataService,
    private route: Router
  ) { }

  searchKey!: string;

  ngOnInit(): void {
    if (this.userDataService.getEmail() != null) {
      this.route.navigate(["/layout"])
    } else {
      this.route.navigate(["/login"])
    }
  }
}
