import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Login } from "../models/login";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  public login: Login;
  public errors: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {

    this.userService.logout();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });

    // let token = localStorage.getItem('user.token');
    // if (token) {
    //   console.log(localStorage.getItem('user.token'));
    //   this.router.navigateByUrl('/home');
    // }
  }

  onAuthenticate() {
    this.errors = [];

    if (this.loginForm.dirty && this.loginForm.valid) {
      let login = Object.assign({}, this.login, this.loginForm.value);

      this.userService.authenticate(login)
        .subscribe(
          result => { this.onAuthenticateComplete(result) },
          error => { this.onErrorComplete(error) }
        );
    }
  }

  onAuthenticateComplete(res: any): void {

    // seta as variáveis do login
    // this.userService.authSuccessfully();

    // Zera os dados do formulário
    this.loginForm.reset();

    // Zera a coleção de erros
    this.errors = [];

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
