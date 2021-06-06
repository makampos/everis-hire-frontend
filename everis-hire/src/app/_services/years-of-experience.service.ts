import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IYearsOfExperience } from '../_models/IYearsOfExperience';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class YearsOfExperienceService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllYearsOfExperience():Observable<ResponseVM<IYearsOfExperience[]>>{
    return this.http.get<ResponseVM<IYearsOfExperience[]>>(this.baseUrl + 'yearsOfExperience/all')
    .pipe(
     map(yearsOfExperience => {
      return yearsOfExperience
     })
    );
  }
}
