
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/Users/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  
  user:User;
  // idUser:any;
  idLocalStorage :any;
  formUpdate:FormGroup
  constructor(
    private userService:UserService,
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastController:ToastController,
    private router:Router
  ) {
    this.idLocalStorage = localStorage.getItem("id")
    // this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.buildForm();
   }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.idLocalStorage).subscribe( usuario => {
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
      this.userService.update(userData,this.idLocalStorage).subscribe( response => {
        console.log('response registro',response)
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

  deleteUser(){
    this.userService.deleteUser(this.idLocalStorage).subscribe(( async response=>{
      console.log('Usuario Eliminado',response)
      if(response){
        await this.ToastSucess().then( () =>{
          this.authService.logOut();
          this.router.navigateByUrl("/home");
        } )
      }
      else{
        this.ToastUnsucessful();
      }
    }))
    
  }
  goDataPay(){
    alert('se encuentra en desarrollo')
  }

  goChangePassword(){
    this.router.navigate(['password'])
  }


  async ToastUnsucessful(){
    const toast = await this.toastController.create({
      message: 'El usuario no ha podido ser eliminado correctmaente 😢, intentalo denuevo',
      duration: 3000,
      position:'bottom',
      color:"danger",
      animated:true
    });
    await toast.present();   
  }

  async ToastSucess(){
    const toast = await this.toastController.create({
      message: '!Usuario eliminado correctamente¡',
      duration: 3000,
      position:'bottom',
      color:"success",
      animated:true
    });
    await toast.present();   
  }
}
