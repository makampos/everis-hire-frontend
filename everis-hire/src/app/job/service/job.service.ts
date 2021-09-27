import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';
import { ResponseVM } from 'src/app/_models/ResponseVM';

import { environment } from 'src/environments/environment';
import { IJob } from '../model/IJob';


@Injectable({
  providedIn: 'root'
})
export class JobService {
 
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private loader: SpinnerService) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeds$(){
    return this._refreshNeeded$;
  }

   getAllJob():Observable<ResponseVM<IJob[]>>{
     return this.http.get<ResponseVM<IJob[]>>(this.baseUrl + 'job/all')
     .pipe(
       map((alljobs) => {
         return alljobs
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
}
