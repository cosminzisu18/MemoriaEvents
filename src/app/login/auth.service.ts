import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorizedSubject = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.isAuthorizedSubject.asObservable();
  isAuthorized = false;

  private baseUrl = 'http://localhost:5080';
  private sessionStorageKey = 'isAuthorized'; 

  constructor(private http: HttpClient) { 
    if(this.isAuthorized){
      this.isAuthorizedSubject.next(!!sessionStorage.getItem(this.sessionStorageKey));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, { username, password }).pipe(
      map(response => {
        sessionStorage.setItem(this.sessionStorageKey, 'true');
        this.isAuthorizedSubject.next(true);
        return response; 
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionStorageKey);
    this.isAuthorizedSubject.next(false);
  }
}
