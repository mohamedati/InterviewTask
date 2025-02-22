import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GetProductList } from '@proxy/dtos';
import { CartRepoService, ProductRepoService } from '@proxy/repos';
import { PrimaryLayoutComponent } from 'src/app/primary-layout/primary-layout.component';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',

  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
/**
 *
 */
CartCount=0;
rows:any[]=[]
total:any[]=[];
@Output() cartCount=new EventEmitter();
  currentPage=1;
constructor(private serv:ProductRepoService,private router:Router,private shared:SharedService,private cart:CartRepoService,private replaceableComponent:ReplaceableComponentsService) {


  
}
  ngOnInit(): void {
   

var data:GetProductList={
  page:1,
  size:10,
  search:null,
  sortBy:null,
  sortOrder:null
  }
  this.serv.getPaginatedListByInput(data).subscribe((result)=>{
    this.rows=result.items
    this.total=Array(Math.ceil(result.totalCount/10))
  })
  this.cart.getCartProductsCountByEmail(sessionStorage.getItem("Email").toString()).subscribe((res)=>{
  this.CartCount=res;
    this.shared.sendData(res)
  })
  }
Filter(val:string){
  var data:GetProductList={
page:1,
search:val=="" ?null :val,
size:10,
sortBy:null,
sortOrder:null
  }

this.serv.getPaginatedListByInput(data).subscribe((result)=>{
  this.rows=result.items
  this.total=Array(Math.ceil(result.totalCount/10))
})

}

AddTocart(ProductID:number){
  var Email=
  this.serv.addProductToCartByEmailAndProductID(sessionStorage.getItem("Email"),ProductID).subscribe((result)=>{
   if(result==0){
    Swal.fire("Product Already in Your cart")
   }else{
    this.CartCount+=1;
  this.shared.sendData( this.CartCount)
   }
 
  
  })
}
Paginate(index){
  this.currentPage = index;
  var data:GetProductList={
    page:index,
    size:10,
    search:null,
    sortBy:null,
    sortOrder:null
    }
    this.serv.getPaginatedListByInput(data).subscribe((result)=>{
      this.rows=result.items
      this.total=Array(Math.ceil(result.totalCount/10))
    })
}
}
