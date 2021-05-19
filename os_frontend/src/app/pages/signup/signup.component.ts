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
        passwd: this.formRegister.value.password,
        type_user: role
      } 
      this.authService.register(userData).subscribe((response)=>{
        console.log('registro',userData)
        this.formRegister.reset();
        this.router.navigateByUrl('/home')
      })
      console.log('registro',userData)
    }else{

      console.log('in-valido')
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
      role:[['',Validators.required]]
    });
  }

}
