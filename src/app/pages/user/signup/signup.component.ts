import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { passwordMatch } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  formRegister:FormGroup;
  user:User;

  private isEmail = /\S+@\S+\.\S+/;
  constructor(
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private router:Router,
    private toastController:ToastController
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    // this.formRegister.patchValue(this.user)
  }

  onRegister(){
    let role:number=+this.formRegister.value.role;

    console.log('formulario',this.formRegister.value,role)
    if(this.formRegister.valid){
      console.log('valido')
      const userData:User = {
        first_name: this.formRegister.value.name,
        last_name : this.formRegister.value.lastName,
        username: this.formRegister.value.nickName,
        address: this.formRegister.value.address,
        email: this.formRegister.value.email,
        passwd: this.formRegister.value.newPassword,
        type_user: role
      } 
      this.authService.register(userData).subscribe( async response =>{
        console.log('registro',userData)
        if(response){
          await this.ToastSucess(response.username).then( () => {
            this.formRegister.reset();
            this.router.navigateByUrl('/home')
          })
        }else{
          this.ToastUnsucessful();
        }
      })
      console.log('registro',userData)
    }else{

      console.log('in-valido')
    }

  }

  async ToastSucess(username:string){
    const toast = await this.toastController.create({
     header:'Bienvenido '+username+' 😎😎',
      duration: 3000,
      position:'bottom',
      color:"success",
      animated:true,
    });
    await toast.present();   
  }

  async ToastUnsucessful(){
    const toast = await this.toastController.create({
      message: 'Upps algo salio mal🤪, intentalo denuevo',
      duration: 3000,
      position:'bottom',
      color:"danger",
      animated:true
    });
    await toast.present();   
  }

  private buildForm(){
    this.formRegister = this.formBuilder.group({
      name:['',[Validators.required]],
      lastName:['',[Validators.required]],
      nickName:['',[Validators.required]],
      address:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      newPassword:['',[Validators.required]],
      newConfirmPassword:['',[Validators.required]],
      role:[['',Validators.required]]
    },
    {
      validator:passwordMatch
    });
  }

  passwordCheck(): boolean {
    return this.formRegister.hasError('noSonIguales') &&
      this.formRegister.get('newPassword').dirty &&
      this.formRegister.get('newConfirmPassword').dirty;
  }


}
