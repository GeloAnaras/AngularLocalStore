import { Injectable } from '@angular/core';
import { User } from "../../entities/User";
import {StorageService} from "../storage/storage.service";
import {Observable, Observer, of, Subject} from "rxjs/index";
import {useAsPath} from "tslint/lib/configuration";


@Injectable()
export class AuthService {
  activeUser:User = null;
  constructor(private storageService:StorageService) {}

  verify(user:User){
    if(user.login === "" || user.password === "") return;
    if(this.storageService.getUserByLogin(user.login)[0] === undefined){
      this.register(user);
      return
    }
    if(this.storageService.getUserByLogin(user.login)[0].login === user.login &&
       this.storageService.getUserByLogin(user.login)[0].password === user.password) this.login(user);
  }
  logout(user:User){
    this.activeUser = null;
    this.storageService.clearUser(user);
  }
  register(user:User){
    this.storageService.setUser(user);
    this.login(user);
  }
  login(user:User){
    this.activeUser = user;
    this.storageService.saveUser(user);
  }
  stream = new Subject();

  update(){
    this.stream.next(this.activeUser);
  }
}
