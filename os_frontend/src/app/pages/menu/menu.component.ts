import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/Users/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit,DoCheck {

  idUser:any
  constructor(
    private userService: UserService,
    private router:Router
  ) {
   
   }

  ngOnInit() {

  }

  ngDoCheck(){
    this.getId()
  }

  getId(){
    this.idUser = this.userService.userId
    console.log('id del usuario',this.idUser)
  }

  goUser(id:any) {
    this.router.navigate(['account/' + id]);
  }
}
