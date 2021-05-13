import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private formBuilder: FormBuilder
    ) { 
      this.buildForm();
    }

  ngOnInit() { }

  onLogin():void{

    if(this.formLogin.valid){
      const userData:UserLogin = {
        email : this.formLogin.value.email,
        password : this.formLogin.value.password,
      }
      this.authService.login(userData).subscribe( response => {
        this.formLogin.reset();
        this.router.navigateByUrl('/home')
      })
    }
    console.log('login',this.formLogin)
  }

  private buildForm(){
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }

}
