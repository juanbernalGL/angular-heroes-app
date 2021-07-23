import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth! };
  }

  constructor( private http: HttpClient) { }

  verifyAuth(): Observable<boolean> | boolean {
    if(!localStorage.getItem('id')){
      return of(false);
    }
    
    return this.http.get<Auth>(`${ this.baseUrl}/users/1`)
    .pipe(
      map( auth => {
        console.log(`map`, map);
        return true;
      })
    )
  }


  login() {
    return this.http.get<Auth>(`${ this.baseUrl}/users/1`)
    .pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('id', auth.id)),
    );
  }

  logout() {
    this._auth = undefined;
  }
}
