import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  postJob(job: IJob): Observable<ResponseVM<IJob>>{
    return this.http.post<ResponseVM<IJob>>(this.baseUrl + 'job', job).pipe(  
      map((response: ResponseVM<IJob>) => response.data)
    )       
  }

  
}
