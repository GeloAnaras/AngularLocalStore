import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {Post} from "../../entities/Post";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title:string="";
  text:string="";
  post:number = 0;
  constructor(private storageService:StorageService,private authService:AuthService,private router:Router
              ,private aR:ActivatedRoute) {
    if(aR.snapshot.params['id']){
      let id = aR.snapshot.params['id'] as number;
      let post = storageService.getPostById(id);
      this.post = id;
      this.title = post.title;
      this.text = post.text;
    }
  }

  ngOnInit() {
  }

  newPost():Post{
    return new Post(this.title,this.text,this.authService.activeUser.login,new Date().toLocaleString())
  }
  create():number{
    if(this.authService.activeUser !== null){
      let index = this.storageService.setPost(this.newPost());
      this.router.navigateByUrl("view/"+ index);
      return index;
    }

  }

  edit() {
    if(this.authService.activeUser !== null){
      this.storageService.delPost(this.aR.snapshot.params['id']);
      this.router.navigate(['/view',this.create()])
    }
  }
}
