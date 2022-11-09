import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../knowledgekart/globals';
import { AuthenticationService } from '../knowledgekart/services/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/normalize.css', '../../assets/css/vendor.css', '../../assets/icomoon/icomoon.css', '../../assets/style.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router, private fb: FormBuilder, private globals: Globals) {
    this.loginForm = fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl(['', Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm !== null) {
      let username = this.loginForm?.get('username')?.value;
      let password = this.loginForm?.get('password')?.value;
      this.authenticationService.login(username, password).subscribe(() => {
        this.globals.loggedInUser = username;
        if (username === "auror") {
          this.router.navigateByUrl("/admin");
        } else {
          this.router.navigateByUrl("/")
        }
      });
    }
  }

}
