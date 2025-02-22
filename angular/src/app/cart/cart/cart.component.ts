import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCartDTo, ProductDTO } from '@proxy/dtos';
import { ProductRepoService } from '@proxy/repos';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cart',

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

CartID=0;
Products:ProductCartDTo []=[]
constructor(private ActRoute:ActivatedRoute,private Serv:ProductRepoService,private shared:SharedService)  {
}
  ngOnInit(): void {
  
     var Email=sessionStorage.getItem("Email");

       this.Serv.getProductsOfCartByEmail(Email).subscribe((result)=>{
        result.forEach((ele)=>{
this.Products.push(ele)
        })
      
       })
       console.log(this.Products);
       
       
     }
    
     /*updateCart(){
      this.Serv.upadteProductinCartByProductCart(this.Products).subscribe((res)=>{
        var Email=sessionStorage.getItem("Email");
this.Products=[]
        this.Serv.getProductsOfCartByEmail(Email).subscribe((result)=>{
          result.forEach((ele)=>{
  this.Products.push(ele)
          })
      })
    })
     }
    */
     removeFromCart(item){
      var Email=sessionStorage.getItem("Email");

this.Serv.deleteProductFromCartByEmailAndProductID(Email ,item).subscribe((res)=>{
  this.Serv.getProductsOfCartByEmail(Email).subscribe((result)=>{
    this.Products=[]
    result.forEach((ele)=>{
      this.Products.push(ele)
    })
    this.shared.sendData(result.length)
   })

})
     }
     getTotalItems(){
    var Total=0;
   this.Products.forEach((ele)=>{
Total+=ele.productPrice*ele.quantity;
   })
   return Total;
     }

     getTotalPrice(){
 var total=this.getTotalItems() +(this.getTotalItems()*15/100)
 return total;
     }
}
