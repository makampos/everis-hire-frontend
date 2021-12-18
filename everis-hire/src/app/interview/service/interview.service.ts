import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IJob } from 'src/app/job/model/IJob';
import { ResponseVM } from 'src/app/_models/ResponseVM';
import { environment } from 'src/environments/environment';
import { IInterview } from '../model/IInterview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

private _refreshNeeded$ = new Subject<void>();

get refreshNeeds$(){
  return this._refreshNeeded$;
}

  postInterview(interview: IInterview): Observable<ResponseVM<IInterview>>{
    return this.http
    .post<ResponseVM<IInterview>>(this.baseUrl + 'interview', interview)
      .pipe(        
        tap(() => {
          this.refreshNeeds$.next();
        },
        map((response: ResponseVM<IInterview>) => response.data))        
    )    
  }

  getAllInterview():Observable<ResponseVM<IInterview[]>>{
    return this.http.get<ResponseVM<IJob[]>>(this.baseUrl + 'interview/all')
    .pipe(
      map((interview) => {
        return interview
      })
    );
  } 

  editInterview(interview: IInterview): Observable<ResponseVM<IInterview>>{
    return this.http
    .put<ResponseVM<IInterview>>(this.baseUrl + 'interview', interview)
      .pipe(        
        tap(() => {
          this.refreshNeeds$.next();
        },
        map((response: ResponseVM<IInterview>) => response.data))        
    )    
  }
}
