import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { User } from "../models/user";
import { Login } from "../models/login";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public insertUserForm: FormGroup;
  public user: User;
  public login: Login;
  public errors: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User();
    this.login = new Login();

    localStorage.removeItem('user.email');
    localStorage.removeItem('user.name');
    localStorage.removeItem('user.token');
  }

  ngOnInit() {
    this.insertUserForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onInsert() {
    if (this.insertUserForm.dirty && this.insertUserForm.valid) {
      let user = Object.assign({}, this.user, this.insertUserForm.value);

      this.userService.insert(user)
        .subscribe(
          result => { this.onInsertComplete(result) }
        );
    }
  }

  onInsertComplete(res: any): void {
    this.login.email = res.data.email;
    this.login.password = res.data.password;

    this.userService.authenticate(this.login)
      .subscribe(
        result => { this.onAuthenticateComplete(result) },
        error => { this.onErrorComplete(error) }
      );
  }

  onAuthenticateComplete(res: any): void {

    // seta as variáveis do login
    // this.userService.authSuccessfully();

    // Zera os dados do formulário
    this.insertUserForm.reset();

    // Grava o e-mail e o nome no localStorage
    localStorage.setItem('user.email', res.data.email);
    localStorage.setItem('user.name', res.data.name);
    localStorage.setItem('user.token', res.token);

    // Redireciona para a página Home
    this.router.navigate(['/home']);
  }

  onErrorComplete(error: any) {
    this.errors.push(JSON.stringify(error.error.message));
  }
}