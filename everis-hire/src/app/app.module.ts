import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginPageComponent } from './login-page/login-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ProjectComponent } from './project/project.component';
import { CandidateComponent } from './candidate/candidate.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { NetworkInterceptor } from './_interceptors/network.interceptor';
import { JobComponent } from './job/job.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDialogComponent } from './job/generic-dialog/generic-dialog.component';
import { JobTableComponent } from './job/job-table/job-table.component';
import { JobRegisterComponent } from './job/job-register/job-register.component';
import { ConfirmDialogComponent } from './job/confirm-dialog/confirm-dialog.component';
import { CandidateTableComponent } from './candidate/candidate-table/candidate-table.component';
import { CandidateRegisterComponent } from './candidate/candidate-register/candidate-register.component';
import { CandidateDialogComponent } from './candidate/candidate-dialog/candidate-dialog.component';
import { ConfirmToDeleteCandidateComponent } from './candidate/confirmToDeleteCandidate/confirmToDeleteCandidate.component';
import { InterviewComponent } from './interview/interview.component';
import { InterviewRegisterComponent } from './interview/interview-register/interview-register.component';
import { InterviewTableComponent } from './interview/interview-table/interview-table.component';
import {MatStepperModule} from '@angular/material/stepper';
import { EditInterviewDialogComponent } from './interview/edit-interview-dialog/edit-interview-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    ProjectComponent,
    CandidateComponent,
    SpinnerComponent,
    JobComponent,  
    GenericDialogComponent,
    JobTableComponent,
    JobRegisterComponent,
    ConfirmDialogComponent,
    CandidateTableComponent,
    CandidateRegisterComponent,
    CandidateDialogComponent,
    ConfirmToDeleteCandidateComponent,
    InterviewComponent,
    InterviewRegisterComponent,
    InterviewTableComponent,
    EditInterviewDialogComponent
  ],
  imports: [
    MatStepperModule,
    CommonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  exports: [
    ToastrModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: 'pt-BR'},
    {provide: DatePipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
