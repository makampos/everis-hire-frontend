import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStatusCandidate } from '../_models/IStatusCandidate';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class StatusCandidateService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

  getAllStatusCandidate():Observable<ResponseVM<IStatusCandidate[]>>{
    return this.http.get<ResponseVM<IStatusCandidate[]>>(this.baseUrl + "statusCandidate/all")
    .pipe(
      map(statusCandidate => {
        return statusCandidate
      })
    );
  } 
}
