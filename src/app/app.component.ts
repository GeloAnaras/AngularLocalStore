import { Component } from '@angular/core';
import {User} from "./entities/User";
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {Observable, Observer} from "rxjs/index";
import {StorageService} from "./services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private activeUser: User = null;

  constructor(private authService: AuthService, private router: Router, private storage:StorageService) {
    this.activeUser = storage.getUser();
    if(storage.getUser()){
      this.authService.login(this.activeUser);
      this.authService.update();
    }
  }

  user: User = new User("", "");

  login() {
    this.authService.verify(this.user);
    this.activeUser = this.authService.activeUser;
    this.authService.login(this.activeUser);
    this.authService.update();
  }

  logout() {
    this.authService.logout(this.activeUser);
    this.activeUser = this.authService.activeUser;
    this.authService.update();
  }

  toMain() {
    this.router.navigateByUrl("/")
  }
}
