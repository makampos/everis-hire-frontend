import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILeaderCenters } from '../_models/ILeaderCenters';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class LeaderCentersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllLeaderCenters():Observable<ResponseVM<ILeaderCenters[]>>{
    return this.http.get<ResponseVM<ILeaderCenters[]>>(this.baseUrl + 'leaderCenters/all')
    .pipe(
      map((leaderCenters) => {
        return leaderCenters;
      })
    )
  }
}
