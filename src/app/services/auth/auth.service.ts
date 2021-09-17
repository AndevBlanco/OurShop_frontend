import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtResponse } from 'src/app/models/jwtresponse';
import { JwtResponseRegister } from 'src/app/models/jwtresponseRegister';
import { User } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/userLogin.model';
import { UserService } from '../Users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'https://ourshopbackend.herokuapp.com/users';
  authSubject = new BehaviorSubject(false);
  private token : string; 

  constructor( 
    private httpClient:HttpClient,
    private userService:UserService
    ) { }

  register(user:User):Observable<JwtResponseRegister>{
    return this.httpClient.post<JwtResponseRegister>(`${this.AUTH_SERVER}/`,user)
    .pipe(tap(
      (res:JwtResponseRegister) => {
        if(res){
          //enviar id de usuario
          this.saveId(res._id);
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
          //enviar id de usuario
          this.saveId(res.id);
          //Guardar token
          this.saveToken(res.accesToken,res.expiresIn);
        }
      }
    ));
  }

  logOut():void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("id")
    this.removeId();
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

  private saveId(id){
    this.userService.saveId(id);
    // this.userService.userId=id
  }
  private removeId(){
    this.userService.removeId();
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
