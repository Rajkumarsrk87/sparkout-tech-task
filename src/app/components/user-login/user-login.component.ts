import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/user';
import { UserDataService } from 'src/app/service/user-data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private userDataService: UserDataService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  gotoSignup() {
    this.route.navigate(['/registration'])
  }

  user: Users = new Users();
  response: any;
  message = false;
  responseMessage: string = '';
  messageColor = '';

  login() {
    if (this.loginForm.valid) {
      this.user.email = JSON.parse(JSON.stringify(this.loginForm.value.userName));
      this.user.password = JSON.parse(JSON.stringify(this.loginForm.value.password));

      this.userService.userLogin(this.user).subscribe((resp) => {
        this.response = resp;

        Object.keys(resp).forEach((datas) => {
          const userDetails = resp[datas];

          if (userDetails.email) {
            this.userDataService.setUserName(userDetails.name);
            this.userDataService.setEmail(userDetails.email);
            window.location.href = window.location.href
            // this.route.navigate(['/layout']);
          } else if (this.response.status == 401) {
            this.message = true;
            this.responseMessage = this.response.message;
            this.messageColor = 'red';
          } else if (this.response.status == 404) {
            this.message = true;
            this.responseMessage = this.response.message;
            this.messageColor = 'red';
          }
        });
      });
    }
  }

}
