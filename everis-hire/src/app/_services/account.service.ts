import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(user: User){
    return this.http.post(this.baseUrl + 'account/authenticate', user).pipe(
      map((response: any) => {       
         user = response;         
        if(user) {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
          this.toastr.success('Success')
        }
      })
    )
  }

}
