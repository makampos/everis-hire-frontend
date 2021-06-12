import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStatusJob } from '../_models/IStatusJob';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class StatusJobService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllStatusJob():Observable<ResponseVM<IStatusJob[]>>{
    return this.http.get<ResponseVM<IStatusJob[]>>(this.baseUrl + "statusJob/all")
    .pipe(
      map(statusJob => {
        return statusJob
      })
    );
  } 
}
