import { AuthService, ConfigStateService } from '@abp/ng.core';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated
  }

  constructor(private authService: AuthService,private config: ConfigStateService) {


    this.config.getOne$("currentUser").subscribe(currentUser => {
      if(currentUser.roles.length>0){
        sessionStorage.setItem("Role","Admin")
      }
      
      sessionStorage.setItem("Email",currentUser.email)
    
   })
  }


}
