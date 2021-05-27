import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
   
  constructor(private fb: FormBuilder, 
      private router: Router,
      private accountService: AccountService,
      private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username:[''],
    password:['']
  })

  login(){
    const user:User = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.accountService.login(user).subscribe(response => {
      this.router.navigateByUrl('/dashboard');
    },error => {      
      this.toastr.error(error.error)
    })
  }

}
