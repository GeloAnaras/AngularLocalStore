import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AuthService} from "./services/auth/auth.service";
import {FormsModule} from "@angular/forms";
import {StorageService} from "./services/storage/storage.service";
import {RouterModule, Routes} from "@angular/router";
import { CreateComponent } from './components/create/create.component';
import { ViewComponent } from './components/view/view.component';
import { ListComponent } from './components/list/list.component';
import { BadurlComponent } from './components/badurl/badurl.component';

const routes:Routes = [
  {path:"edit/:id",component:CreateComponent},
  {path:"create",component:CreateComponent},
  {path:"view/:id",component:ViewComponent},
  {path:"",component:ListComponent},
  {path:"**",component:BadurlComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent,
    ListComponent,
    BadurlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
