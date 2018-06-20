import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {Post} from "../../entities/Post";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  postId:number;
  currentPost:Post = null;
  authUser;
  constructor( private aR:ActivatedRoute,private storageService:StorageService, private authService:AuthService
  ,private router:Router) {
    this.postId = aR.snapshot.params["id"];
    authService.stream.subscribe(e=>{
      this.authUser = e;
    });
    authService.update();
  }

  ngOnInit() {
    this.currentPost = this.storageService.getPostById(this.postId)
  }
  onDelete(index:number) {
    this.storageService.delPost(this.postId);
    this.router.navigateByUrl('');
  }

}
