import { Component } from '@angular/core';
import { AuthService, ConfigStateService } from '@abp/ng.core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated
  }

  constructor(private authService: AuthService,private router:Router,private config: ConfigStateService) {

    if(!this.hasLoggedIn){
      this.login();
    }else{
      this.config.getOne$("currentUser").subscribe(currentUser => {
        if(currentUser.roles.length>0){
          sessionStorage.setItem("Role","Admin")
        }else{
          sessionStorage.removeItem("Role")
        }
 
        sessionStorage.setItem("Email",currentUser.email)
      
     })
      if(sessionStorage.getItem("Role")){
       
        this.router.navigate(['/Products'])
      }else{

        this.router.navigate(['/Client'])
      }
      
    }
  }

  login() {
    this.authService.navigateToLogin();
 
  }
}
