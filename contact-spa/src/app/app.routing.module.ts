import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactInsertComponent } from './contacts/contact-insert/contact-insert.component';
import { ContactUpdateComponent } from './contacts/contact-update/contact-update.component';
import { ContactDeleteComponent } from './contacts/contact-delete/contact-delete.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contact-insert', component: ContactInsertComponent, canActivate: [AuthGuard] },
  { path: 'contact-update/:id', component: ContactUpdateComponent, canActivate: [AuthGuard] },
  { path: 'contact-delete', component: ContactDeleteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}