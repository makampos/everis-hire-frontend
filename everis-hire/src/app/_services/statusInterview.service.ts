import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStatusInterview } from '../_models/IStatusInterview';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class StatusInterviewService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getAllStatusInterview():Observable<ResponseVM<IStatusInterview[]>>{
  return this.http.get<ResponseVM<IStatusInterview[]>>(this.baseUrl + "statusInterview/all")
  .pipe(
    map(statusInterview => {
      return statusInterview
    })
  );
} 

}
