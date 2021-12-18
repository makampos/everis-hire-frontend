import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICandidateInterviewDetail } from '../interview/model/ICandidateInterviewDetail';
import { ICandidate } from '../_models/ICandidate';
import { ResponseVM } from '../_models/ResponseVM';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeds$(){
    return this._refreshNeeded$;
  }

  getAllCandidates():Observable<ResponseVM<ICandidate[]>>{
    return this.http.get<ResponseVM<ICandidate[]>>(this.baseUrl + 'candidate/all')
    .pipe(
      map((allCandidates) => {
        return allCandidates
      })
    );
  } 

  getAllCandidatesNotInInterview():Observable<ResponseVM<ICandidate[]>>{
    return this.http.get<ResponseVM<ICandidate[]>>(this.baseUrl + 'candidate/notInInterview')
    .pipe(
      map((allCandidates) => {
        return allCandidates
      })
    );
  }

  getCandidateById(candidateId: number):Observable<ResponseVM<ICandidate>> {
    return this.http.get<ResponseVM<ICandidate>>(this.baseUrl + 'candidate' + '/'+ candidateId)
      .pipe(
        map(candidate => {
          return candidate;
        }),
      )
  }

  getCandidateByIdWithInclude(candidateId: number):Observable<ResponseVM<ICandidateInterviewDetail>> {
    return this.http.get<ResponseVM<ICandidateInterviewDetail>>(this.baseUrl + 'candidate' + '/interview/'+ candidateId)
      .pipe(
        map(candidate => {
          return candidate;
        }),
      )
  }


  postCandidate(candidate: ICandidate) : Observable<ResponseVM<ICandidate>>{
    return this.http
    .post<ResponseVM<ICandidate>>(this.baseUrl + 'candidate', candidate)
      .pipe(
        tap(()=> {
          this.refreshNeeds$.next();
        },
        map((Response: ResponseVM<ICandidate>) => Response.data))
    )
  }

  editCandidate(candidate: ICandidate): Observable<ResponseVM<ICandidate>>{
    return this.http
    .put<ResponseVM<ICandidate>>(this.baseUrl + 'candidate', candidate)
      .pipe(        
        tap(() => {
          this.refreshNeeds$.next();
        },
        map((response: ResponseVM<ICandidate>) => response.data))        
    )    
  }


  deleteCandidate(candidateId: number): Observable<ResponseVM<ICandidate>> {
    return this.http
      .delete<ResponseVM<ICandidate>>(this.baseUrl + 'candidate' + '/' + candidateId)
      .pipe(
        tap(()  => {
         this.refreshNeeds$.next(); 
        }, 
        map((response: ResponseVM<ICandidate>) => response.data))
      )
  }


}
