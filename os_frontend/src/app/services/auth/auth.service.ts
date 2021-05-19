import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtResponse } from 'src/app/models/jwtresponse';
import { User } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'https://ourshopbackend.herokuapp.com/users';
  authSubject = new BehaviorSubject(false);
  private token : string; 

  constructor( private httpClient:HttpClient) { }

  register(user:User):Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/`,user)
    .pipe(tap(
      (res:JwtResponse) => {
        if(res){
          //Guardar Token
          this.saveToken(res.accesToken, res.expiresIn);    
        }
      }
      ));
  }

  login(user:UserLogin):Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,user)
    .pipe(tap(
      (res:JwtResponse) =>{
        if(res){
          console.log('response',res.accesToken)
          this.saveToken(res.accesToken,res.expiresIn);
        }
      }
    ));
  }

  logOut():void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRE_IN");
  }

  private saveToken(token: string, expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token = token;
  }

  getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token
  }

  isAuth():Observable<boolean>{
   const token = this.getToken()
   if(token === null ){
     return of(false);
   }else{
     return of(true)
   }
  }
  

}
