import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/Project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  save(project:Project) {
    return this.http.post(this.baseUrl + 'project', project).pipe(
      map((response: any) => {
        project = response;        
      })
    )
  }  
}
