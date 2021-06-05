import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRecruiter } from '../_models/IRecruiter';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllRecruiter():Observable<ResponseVM<IRecruiter[]>> {
    return this.http.get<ResponseVM<IRecruiter[]>>(this.baseUrl + 'recruiter/all')
    .pipe(
      map(recruiters => {
        return recruiters;        
      })    
    );
  } 
}


