import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path: '',component: LoginPageComponent},
  {
    path:'',
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'login', component: LoginPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
