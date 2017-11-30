import {AfterContentInit, AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {LoginService} from '../_services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  username: string;
  password: string;
  submitted = false;
  message: string;

  constructor(private loginService: LoginService,
              private router: Router) {
  }


  ngOnInit() {

  }


  ngDoCheck() {
    this.message = this.loginService.getMessage();

   if (this.loginService.isLoggedIn()) {
     this.router.navigateByUrl('/books');
   }
  }

  login(): void {
    this.loginService.login(this.username, this.password);
  }


  logout(): void {
    this.loginService.logout();
    this.submitted = false;
  }


}
