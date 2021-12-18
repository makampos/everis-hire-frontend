import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAllocationType } from '../_models/IAllocationType';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class AllocationTypeService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getAllAllocationType():Observable<ResponseVM<IAllocationType[]>>{
  return this.http.get<ResponseVM<IAllocationType[]>>(this.baseUrl + "allocationType/all")
  .pipe(
    map(allocationType => {
      return allocationType
    })
  );
} 
}
