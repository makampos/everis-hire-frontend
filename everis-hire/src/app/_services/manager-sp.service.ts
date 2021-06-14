import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IManagerSp } from '../_models/IManagerSp';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class ManagerSpService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllManagerSp():Observable<ResponseVM<IManagerSp[]>>{
    return this.http.get<ResponseVM<IManagerSp[]>>(this.baseUrl + "managerSp/all")
    .pipe(
      map(managerSp => {
        return managerSp
      })
    );
  }
}
