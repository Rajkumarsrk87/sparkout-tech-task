import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  userSignup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      Validators.required
    ]),
  });

  color = '';
  passwordCheck = true;
  checkConfirmPassword() {
    const password = this.userSignup.value.password as string;
    const confirmPassword = this.userSignup.value.confirmPassword as string;
    if (password.length == confirmPassword.length &&
      password == confirmPassword) {
      this.color = 'black';
      this.passwordCheck = true;
    } else {
      this.color = 'red';
      this.passwordCheck = false;
    }
  }

  user: Users = new Users();
  message = false;
  responseMessage?: string;
  responseColor = 'black';
  response: any;
  emailExistMessage = "This email user is already exist";
  onSubmit() {
    if (this.userSignup.valid) {
      if (this.passwordCheck) {
        this.user.name = JSON.parse(
          JSON.stringify(this.userSignup.value.name)
        );
        this.user.email = JSON.parse(
          JSON.stringify(this.userSignup.value.email)
        );
        this.user.confirmPassword = JSON.parse(
          JSON.stringify(this.userSignup.value.confirmPassword)
        );

        this.userService.createUser(this.user).subscribe((resp) => {
          this.response = resp;

          if (this.response.status == 200) {
            this.message = true;
            this.responseMessage = this.response.message;
            this.responseColor = 'green';
            this.userSignup.reset();
          }
          else if (this.response.status == 400 && this.response.message == this.emailExistMessage) {
            this.message = true;
            this.responseMessage = this.response.message;
            this.responseColor = 'red';
          }
        });
      } else {
        this.message = true;
        this.responseMessage = "Confirm password didn't match. Please try again";
        this.responseColor = 'red';
      }
    }
  }

}
