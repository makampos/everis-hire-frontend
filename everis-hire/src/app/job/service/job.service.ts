import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IEverJob } from 'src/app/interview/model/IEverJob';
import { IJobInterviewDetail } from 'src/app/interview/model/IJobInterviewDetail';
import { ResponseVM } from 'src/app/_models/ResponseVM';

import { environment } from 'src/environments/environment';
import { IJob } from '../model/IJob';


@Injectable({
  providedIn: 'root'
})
export class JobService {
 
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeds$(){
    return this._refreshNeeded$;
  }

  getJobByEverJob(everJob: any):Observable<ResponseVM<IJobInterviewDetail>> {
    return this.http.get<ResponseVM<IJobInterviewDetail>>(this.baseUrl + 'job/interview/'+ everJob)
      .pipe(
        map(job => {
          return job;
        }),
      )
  }

   getAllJob():Observable<ResponseVM<IJob[]>>{
     return this.http.get<ResponseVM<IJob[]>>(this.baseUrl + 'job/all')
     .pipe(
       map((alljobs) => {
         return alljobs
       })
     );
   } 

   getAllOpenJob():Observable<ResponseVM<IEverJob[]>>{
    return this.http.get<ResponseVM<IEverJob[]>>(this.baseUrl + 'job/all/open')
    .pipe(
      map((allEverJobs) => {
        return allEverJobs
      })
    );
  } 
  
  postJob(job: IJob): Observable<ResponseVM<IJob>>{
    return this.http
    .post<ResponseVM<IJob>>(this.baseUrl + 'job', job)
      .pipe(        
        tap(() => {
          this.refreshNeeds$.next();
        },
        map((response: ResponseVM<IJob>) => response.data))        
    )    
  }

  editJob(job: IJob): Observable<ResponseVM<IJob>>{
    return this.http
    .put<ResponseVM<IJob>>(this.baseUrl + 'job', job)
      .pipe(        
        tap(() => {
          this.refreshNeeds$.next();
        },
        map((response: ResponseVM<IJob>) => response.data))        
    )    
  }

  deleteJob(jobId: number): Observable<ResponseVM<IJob>> {
    return this.http
      .delete<ResponseVM<IJob>>(this.baseUrl + 'job' + '/' + jobId)
      .pipe(
        tap(()  => {
         this.refreshNeeds$.next(); 
        }, 
        map((response: ResponseVM<IJob>) => response.data))
      )
  }

}
