import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICommunity } from '../_models/ICommunity';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getAllCommunity():Observable<ResponseVM<ICommunity[]>>{
    return this.http.get<ResponseVM<ICommunity[]>>(this.baseUrl + 'community/all')
      .pipe(
        map(community => {
          return community
        })
      );
  }
}
