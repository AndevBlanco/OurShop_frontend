import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/Users/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router:Router
  ) {
   
   }

  ngOnInit() {

  }

  goUser() {
    this.router.navigate(['account/' + localStorage.getItem('id')]);
  }
}
