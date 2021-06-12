import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPriority } from '../_models/IPriority';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllPriority():Observable<ResponseVM<IPriority[]>>{
    return this.http.get<ResponseVM<IPriority[]>>(this.baseUrl + 'priority/all')
    .pipe(
      map(priority => {
        return priority
      })
    );
  }

}
