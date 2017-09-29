import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';


import { Config } from './config/config.config';
import { MyInterceptor } from './interceptors/MyInterceptor';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticleListComponent } from './components/articleList/articleList.component';
import { ArticleDetailComponent } from './components/articleDetail/articleDetail.component';
import { CreateProfileComponent } from './components/createprofile/createprofile.component';
import { EditProfileComponent } from './components/editprofile/editprofile.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import {UtilService} from './services/util.service';
import { LoginGuard } from './services/loginguard.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

import { Token } from './models/token.model';
import { Session } from './models/session.model';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';


import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'ls',
      storageType: 'localStorage'
    }),
    FileUploadModule,
    TagInputModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    CreateProfileComponent,
    EditProfileComponent,
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    Config,
    LoginGuard,
    UtilService,
    AuthService,
    ProfileService,
    Token,
    Session,
    User,
    Profile
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
