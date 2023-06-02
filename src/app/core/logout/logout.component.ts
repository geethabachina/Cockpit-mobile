import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loginShow: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    this.loginShow = true;
  }

}
