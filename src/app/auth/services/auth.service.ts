import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { authResponse, Usuario } from '../interfaces/interfaces';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private baseulr: string = environment.baseUrl;
  private _usuario: Usuario;

  get usuario() {
    return {...this._usuario};
  }
  login(email: string, password: string) {
  
    const url = `${this.baseulr}/auth`;
    const body ={email,password}
    return this.http.post<authResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
          )
  }

  validarToken():Observable<boolean> {
    const url = `${this.baseulr}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<authResponse>(url, { headers })
      .pipe(
        map(resp => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token);
          this._usuario ={
            name: resp.name,
            uid: resp.uid,
            email:resp.email
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }


  registro(name: string, email: string, password: string) {
    const body = { name, email, password };
    const url = `${this.baseulr}/auth/new`;
    return this.http.post<authResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token);
       
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }
}
