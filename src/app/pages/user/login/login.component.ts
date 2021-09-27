import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserLogin } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup
  user:UserLogin;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController:ToastController
    ) { 
      this.buildForm();
    }

  ngOnInit() { }

  onLogin():void{

    if(this.formLogin.valid){
      const userData:UserLogin = {
        xemail : this.formLogin.value.email,
        xpassword : this.formLogin.value.password,
      }
      this.authService.login(userData).subscribe( async response => {
        console.log('response login',response)
        if(response.login){
          
          await this.ToastSucess(response.name).then( () =>{

            this.router.navigateByUrl('/home')
            this.formLogin.reset();
          } )
        }else{
          this.ToastUnsucessful();
        }
      },
      (error) => {
        this.ToastUnsucessful();
      });
    }
    console.log('login',this.formLogin)
  }

  private buildForm(){
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }

  async ToastSucess(username:string){
    const toast = await this.toastController.create({
      message: '!Bienvenido '+username+'!',
      duration: 3000,
      position:'bottom',
      color:"success",
      animated:true
    });
    await toast.present();   
  }

  async ToastUnsucessful(){
    const toast = await this.toastController.create({
      message: 'Ingreso fallido, intentalo denuevo',
      duration: 3000,
      position:'bottom',
      color:"danger",
      animated:true
    });
    await toast.present();   
  }

}
