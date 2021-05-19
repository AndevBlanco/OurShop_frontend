import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtResponse } from 'src/app/models/jwtresponse';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER: string = 'https://ourshopbackend.herokuapp.com/users';
  private token : string; 

  userId:any;
  user:User;
  constructor(
    private httpClient:HttpClient,
  ) { }

  getUser(id){
    return this.httpClient.get<User>(`${this.AUTH_SERVER}/?id=${id}`)
  }
  saveId( newId){
    this.userId = newId 
  }
  removeId(){
    this.userId = null
    console.log('pa juera')
  }

  update(user:any,id):Observable<JwtResponse>{
    return this.httpClient.put<JwtResponse>(`${this.AUTH_SERVER}/?id=${id}`,user)
    .pipe(tap(
      (res:JwtResponse) => {
        if(res){
          //enviar id de usuario
          this.saveId(res.id);
          //Guardar Token
          this.saveToken(res.accesToken, res.expiresIn);    
        }
      }
      ));
  }

  private saveToken(token: string, expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token = token;
  }
}
