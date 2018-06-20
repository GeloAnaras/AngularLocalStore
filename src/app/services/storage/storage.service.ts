import { Injectable } from '@angular/core';
import {User} from "../../entities/User";
import {Post} from "../../entities/Post";
import {Observable, Observer} from "rxjs/index";

@Injectable()
export class StorageService {

  constructor() {
    window.localStorage.getItem("users") ?
      window.localStorage.getItem("users") :
      window.localStorage.setItem("users",JSON.stringify([]));
    window.localStorage.getItem("posts") ?
      window.localStorage.getItem("posts") :
      window.localStorage.setItem("posts",JSON.stringify([]));
    window.localStorage.getItem("user") ?
      window.localStorage.getItem("user") :
      window.localStorage.setItem("user",JSON.stringify(new User("","")));
  }
  getAllUsers():Array<User>{
    return JSON.parse(window.localStorage.getItem("users"));
  }
  getUserByLogin(login:string):Array<User>{
    let user =  this.getAllUsers().filter(function (elem) {
        return elem.login === login;
    });
    return user;
  }
  setUser(user:User){
    let newUser = this.getAllUsers();
    newUser.push(user);
    window.localStorage.setItem("users",JSON.stringify(newUser));
  }
  getAllPosts():Array<Post>{
    return JSON.parse(window.localStorage.getItem("posts"));
  }
  setPost(post:Post):number{
    let newPost = this.getAllPosts();
    newPost.push(post);
    window.localStorage.setItem("posts",JSON.stringify(newPost));
    return newPost.indexOf(post);
  }
  getPostById(id:number):Post{
    let post = this.getAllPosts()[id];
    return post;
  }
  delPost(index:number){
    let delPost = this.getAllPosts();
    delPost.splice(index,1);
    window.localStorage.setItem("posts",JSON.stringify(delPost));
  }
  storageStream = Observable.create((obserrver:Observer<any>)=>{
      obserrver.next(JSON.parse(window.localStorage.getItem("posts")))
  });
  saveUser(user:User){
    window.localStorage.setItem("user",JSON.stringify(user));
  }
  clearUser(user:User){
    window.localStorage.setItem("user",JSON.stringify(new User("","")));
  }
  getUser(){
    let user = JSON.parse(window.localStorage.getItem("user"));
    if(user.login !== "") return user;
    return null;
  }


}
