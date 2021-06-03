import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserLogin } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/Users/user.service';
import { passwordMatch } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  formPassword:FormGroup
  private idUser:any;
  validInput:boolean
  
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private toastController:ToastController
  ) {
    this.getId();
    this.buildForm()
  }
  
  ngOnInit() {}
  
  onChange(){
    if(this.formPassword.valid){
      const passwordChange = {
        passwd: this.formPassword.value.newPassword,
      }
      this.userService.updatePassword(passwordChange,this.idUser).subscribe( async response => {
        console.log('updatePassword', response.login)
        if(response.login){
          await this.ToastSucess(response.username).then( () =>{      
            this.router.navigateByUrl('/home')
            this.formPassword.reset();
          } )
        }else{
          this.ToastUnsucessful();
        }
      })
    }
  }

  async ToastSucess(username:string){
    const toast = await this.toastController.create({
     header:'Contraseña actualizada 😎😎',
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

  
  getId() {
    this.idUser=localStorage.getItem("id")
  }
  buildForm(){
    this.formPassword = this.formBuilder.group({
      currentPassword:['',[Validators.required,]],
      newPassword:['',[Validators.required]],
      newConfirmPassword:['',[Validators.required]],
    },
    {
      validator:passwordMatch,
    });
  }

  passwordCheck(): boolean {
    return this.formPassword.hasError('noSonIguales') &&
      this.formPassword.get('newPassword').dirty &&
      this.formPassword.get('newConfirmPassword').dirty;
  }

}
