import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private router:Router
  
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    // this.formRegister.patchValue(this.user)
  }

  onRegister(){

    if(this.formRegister.valid){

      const userData = {
        name: this.formRegister.value.name,
        lastName : this.formRegister.value.lastName,
        nickName: this.formRegister.value.nickName,
        address: this.formRegister.value.address,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password,
        role: this.formRegister.value.role
      } 
      this.authService.register(userData).subscribe((response)=>{
        this.formRegister.reset();
        this.router.navigate(['home'])
      })
      console.log('registro',userData)
    }

  }


  private buildForm(){
    this.formRegister = this.formBuilder.group({
      name:['',[Validators.required]],
      lastName:['',[Validators.required]],
      nickName:['',[Validators.required]],
      address:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      role:['',Validators.required]
    });
  }

}
