import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILtf } from '../_models/ILtf';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class LtfService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllLtf():Observable<ResponseVM<ILtf[]>>{
    return this.http.get<ResponseVM<ILtf[]>>(this.baseUrl + "ltf/all")
    .pipe(
      map((ltf) => {
        return ltf
      })
    );
  }
}
