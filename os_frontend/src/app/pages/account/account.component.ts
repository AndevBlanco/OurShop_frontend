
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/Users/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  
  user:User;
  idUser:any;
  formUpdate:FormGroup
  constructor(
    private userService:UserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router
  ) {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.buildForm();
   }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.idUser).subscribe( usuario => {
      this.user = usuario;
      this.formUpdate.patchValue(usuario)
      console.log(this.user.first_name)
    })
  }

  onSave(){

    console.log(this.formUpdate.value)

    if(this.formUpdate.valid){
      console.log('valido')
      const userData = {
        first_name: this.formUpdate.value.first_name,
        last_name : this.formUpdate.value.last_name,
        username: this.formUpdate.value.username,
        address: this.formUpdate.value.address,
        email: this.formUpdate.value.email,
      } 
      console.log('registro',userData)
      this.userService.update(userData,this.idUser).subscribe( response => {
        console.log('response logion',response)
        if(response){
          this.formUpdate.reset();
          this.router.navigateByUrl('/home')
        }else{
          alert('Error, ingrese los datos denuevo')
        }
      })
    }else{

      console.log('in-valido')
    }

  }
  
  private buildForm(){
    this.formUpdate = this.formBuilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      username:['',[Validators.required]],
      address:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
    });
  }

  goDataPay(){
    alert('se encuentra en desarrollo')
  }

  goChangePassword(){
    alert('se encuentra en desarrollo')
  }
}
