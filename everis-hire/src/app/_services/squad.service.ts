import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISquad } from '../_models/ISquad';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllSquad():Observable<ResponseVM<ISquad[]>>{
    return this.http.get<ResponseVM<ISquad[]>>(this.baseUrl + "squad/all")
    .pipe(
      map((squad) => {
        return squad;
      })
    )
  }
}
