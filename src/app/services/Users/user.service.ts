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
    localStorage.setItem("id",newId)
    this.userId = newId 
  }
  removeId(){
    this.userId = null
    console.log('pa juera')
  }

  deleteUser(id:any){
    return this.httpClient.delete(`${this.AUTH_SERVER}/?id=${id}`)
  }

  update(user:any,id):Observable<JwtResponse>{
    return this.httpClient.put<JwtResponse>(`${this.AUTH_SERVER}/?id=${id}`,user)
  }

  updatePassword(password,id):Observable<JwtResponse>{
    return this.httpClient.put<JwtResponse>(`${this.AUTH_SERVER}/modifyPassword/?id=${id}`,password)
    .pipe(tap(
      (res:JwtResponse) =>{
        if(res){
          res.login = true
        }else{
          res.login = false
        }
      }
    ))
  }

  // private saveToken(token: string, expiresIn:string):void{
  //   localStorage.setItem("ACCESS_TOKEN",token);
  //   localStorage.setItem("EXPIRES_IN",expiresIn);
  //   this.token = token;
  // }
}
