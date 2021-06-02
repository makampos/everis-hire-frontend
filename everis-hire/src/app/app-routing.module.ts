import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: DashboardComponent,
  children:[
    {
      path: 'projeto', component: ProjectComponent      
    },
    {
      path: 'candidato', component: CandidateComponent
    }
  ]  
},
  {path: 'login',component: LoginPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
