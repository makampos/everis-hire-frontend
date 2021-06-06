import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITechnology } from '../_models/ITechnology';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllTechnologies():Observable<ResponseVM<ITechnology>>{
    return this.http.get<ResponseVM<ITechnology[]>>(this.baseUrl+ 'technology/all')
    .pipe(
      map((technolgy) => {
        return technolgy;
      })
    );
  }
}
