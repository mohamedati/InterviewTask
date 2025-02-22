import { AuthService } from '@abp/ng.core';
import { Component, Output } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-primary-layout',

  templateUrl: './primary-layout.component.html',
  styleUrl: './primary-layout.component.scss'
})
export class PrimaryLayoutComponent {
 User=sessionStorage.getItem("Email");
 Role=sessionStorage.getItem("Role")
/**
 *this.cartCount
 */
 cartCount=0;
constructor(private auth:AuthService,private shared:SharedService,private Router:Router) {
 this.shared.currentData.subscribe((result)=>{
  this.cartCount=result
 })

 

}

ShowSidebar(){
 
  var x=document.querySelectorAll(".sidebar")[0] as HTMLDivElement
  var y=document.querySelectorAll(".row .col-2")[0] as HTMLDivElement
  var z=document.querySelectorAll(".backdrop")[0] as HTMLDivElement
  if(x.style.display!='block'){
    x.style.display='block';
    y.style.display='block';
  
    x.style.position="absolute";
    x.style.left= "0px";
    x.style.top=" 79px";
    x.style.width="200px";
    x.style.zIndex="99999999999999999999999999999"
     z.style.display='block'
  }else{
    x.style.display='none';
    y.style.display='none';
  
    x.style.position="absolute";
    x.style.left= "0px";
    x.style.top=" 79px";
    x.style.width="200px";
    x.style.zIndex="99999999999999999999999999999"
     z.style.display='none'
  }
 
}
 LogOut(){
  this.auth.logout();
  this.auth.navigateToLogin();
 }
 Handle(data){
  this.cartCount=data;
  alert(data)
 }
}
