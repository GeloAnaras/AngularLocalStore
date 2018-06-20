import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {Post} from "../../entities/Post";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../entities/User";
import {tap} from "rxjs/internal/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input("user") user:User;
  postsArray;
  authUser;
  page:number = 1;
  pageCount:Array<any>;
  constructor(private storageService:StorageService,private authService:AuthService,private route:Router,
              private aR:ActivatedRoute) {
    // this.postsArray = storageService.getAllPosts();
    storageService.storageStream.subscribe(e=>this.postsArray = e);
    authService.stream.subscribe(e=>{
      this.authUser = e;
    });
    this.pageCount = new Array(Math.ceil(this.postsArray.length/5));
    authService.update();
  }

  ngOnInit() {
  console.log();
  }

  onDelete(index:number) {
    this.storageService.delPost(index);
    this.postsArray = this.storageService.getAllPosts();
  }


  paginate(page:number) {
    this.page = page;
  }
}
