import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from "./app.routing.module";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { UserService } from "./services/user.service";
import { ContactService } from "./services/contact.service";

import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactInsertComponent } from './contacts/contact-insert/contact-insert.component';
import { ContactUpdateComponent } from './contacts/contact-update/contact-update.component';
import { ContactDeleteComponent } from './contacts/contact-delete/contact-delete.component';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ContactListComponent,
    ContactInsertComponent,
    ContactUpdateComponent,
    ContactDeleteComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    ContactService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [ContactUpdateComponent, MatConfirmDialogComponent]
})
export class AppModule { }
