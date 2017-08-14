/**
 * Created by tarun on 30/6/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './services/loginguard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticleListComponent } from './components/articleList/articleList.component';
import { ArticleDetailComponent } from './components/articleDetail/articleDetail.component';
import { CreateProfileComponent } from './components/createprofile/createprofile.component';
import { EditProfileComponent } from './components/editprofile/editprofile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'createprofile', component: CreateProfileComponent, canActivate: [LoginGuard] },
  { path: 'editprofile', component: EditProfileComponent, canActivate: [LoginGuard] },
  { path: 'profile',  component: ProfileComponent, canActivate: [LoginGuard] },
  { path: 'articles',  component: ArticleListComponent },
  { path: 'articles/:id',  component: ArticleDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
