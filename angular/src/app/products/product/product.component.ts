import { ReplaceableComponents, ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDataTableComponent } from '@bhplugin/ng-datatable';
import { GetProductList, ProductDTO } from '@proxy/dtos';
import { ProductRepoService } from '@proxy/repos';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { PrimaryLayoutComponent } from 'src/app/primary-layout/primary-layout.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
 
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
//////////////////////////////////////variables
currentIndex: number=10;
cols: ({ field: string; title: string; isUnique: boolean; sort?: undefined; minWidth?: undefined; headerClass?: undefined; cellClass?: undefined; } | { field: string; title: string; isUnique?: undefined; sort?: undefined; minWidth?: undefined; headerClass?: undefined; cellClass?: undefined; } | { field: string; title: string; sort: boolean; isUnique?: undefined; minWidth?: undefined; headerClass?: undefined; cellClass?: undefined; } | { field: string; title: string; sort: boolean; minWidth: string; headerClass: string; cellClass: string; isUnique?: undefined; })[];
UpdateForm!: FormGroup
loadingIndicator = true;
rows: ProductDTO[] = [];
page!:string;
store: any;
searchTerm!:any;
sortColumn: string="ID";
ascending: boolean=true;
pageNumber:number=1
isModalOpen = false
DataGrid!:[{id:number,arName:string,enName:string,parentID:number}];
hasnext:boolean=false;
hasPrev:boolean=false;
totalCount=0;
size=10;
column="";
isColumnHidden = true; 
totalpages:number[]=[];
sortDirection: 'asc' | 'desc' | null = null; 
parent!:string
selectedItem!:string
myForm!:FormGroup;
selectedcategory!:any
options:{id:number,name:string,status:boolean}[]=[]
DropDownCategory: any;
updateCategory!: number;
@ViewChild("datatable")datatable!: NgDataTableComponent;
@ViewChild("CreateeModal") CreateeModal !:NgxCustomModalComponent
@ViewChild("UpdateModal") UpdateModal !:NgxCustomModalComponent
@ViewChild("DeleteModal") DeleteModal !:NgxCustomModalComponent
form:any
Activation!:string[]
AddBrandOPrtions:any[]=[]
status:any
Active!:boolean
AddOPrtions: any[]=[];
UpdateBrandOPrtions:any[]=[]
Brands:any[]=[]
SelectedBrand!:any
updateCategoryOptions:any[]=[]
inProgress: boolean;
  ShowDeleteModal: boolean;
  state: string;
///////////////////////////////////Constructor
constructor(private fb: FormBuilder,private serv:ProductRepoService,private replaceableComponent:ReplaceableComponentsService){



  //////////arabic column Header

      //////////English column Header
    this.cols = [
      { field: 'ID', title: 'ID ',sort:true },
      { field: 'Name', title: 'Name' ,sort:true},
 {field:'QuantityInStock',title:'QuantityInStock',sort:true},

      { field: 'Actions', title: 'Actions',sort:false },

  ];

  this.form = this.fb.group({
    
    name: [null, [Validators.required]],
    price: [null, [Validators.required, Validators.min(1)]],
    QuantityInStock: [null, [Validators.required]],
    Title: [null, [Validators.required]],
    Description:[null]


  });





  var data:GetProductList={
    page:1,
    size:this.size,
  
    search:null,
    sortBy:null,
    sortOrder:null

    }

this.GetProducts(data)

 
 /////////////////////////////Create Form
  this.myForm=new FormGroup({
    ArName:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    ENName:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    ArDescription:new FormControl('',[Validators.maxLength(1024)]),
    EnDescription:new FormControl('',[Validators.maxLength(1024)]),
    BarCode:new FormControl('',[Validators.required]),
    CategoryID:new FormControl('',Validators.required),
    BrandID:new FormControl('',Validators.required),
    isActive:new FormControl(''),

  });



  /////////////////////////////Update Form
  this.UpdateForm=new FormGroup({
    ArName:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    ENName:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    ArDescription:new FormControl('',[Validators.maxLength(1024)]),
    EnDescription:new FormControl('',[Validators.maxLength(1024)]),
    BarCode:new FormControl('',[Validators.required]),
    CategoryID:new FormControl('',Validators.required),
    BrandID:new FormControl('',Validators.required),
    isActive:new FormControl(''),

  });




   

}


////////////////////////////////Function called to show delete POPUP
Delete(id:number){
sessionStorage.setItem("DeleteID",id.toString())
this.ShowDeleteModal=true}





///////////////////////////////////////////////////Finction called to Delete Record

DeleteRecord(){
var id=parseInt(sessionStorage.getItem("DeleteID")!)
this.serv.deleteProduct(id).subscribe((result)=>{

    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      customClass: {
          popup: `bg-success`
      },
    
    })
  toast.fire({
      title: "Deleted Successfully",
  });
  this.ShowDeleteModal=false
  var data={
    page:1,
    size:this.size,
  
    search:this.searchTerm=="" ?null :this.searchTerm,
    sortBy:this.sortColumn=="" ?null :this.sortColumn,
    sortOrder:this.sortDirection
  
  }

  
  this.GetProducts(data)
  this.datatable.currentPage=1
  this.datatable.reset()
  })

}








       GetProducts(data){
        this.serv.getPaginatedListByInput(data).subscribe((result)=>{
          console.log(result.items
          
          );
          
       this.rows=result.items;
       this.totalCount=result.totalCount
         
        })
       }
       save() {
        if (this.form.invalid) return;
    
        this.inProgress = true;
    
   this.serv.addProduct(this.form.value).subscribe((result)=>{
  
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      customClass: {
          popup: `bg-success`
      },
    
  });
 
  toast.fire({
      title:"Product Added Successfully",
    
  });
    var data:GetProductList={
      page:1,
      size:this.size,
    
      search:null,
      sortBy:null,
      sortOrder:null
  
      }
    this.GetProducts(data)
    this.isModalOpen=false
   })
      
      }
       onchange(event:any){
        console.log(event);
        
        if(event.change_type=='sort'){
        
        
        event.sort_direction=='asc' ?this.ascending=true :this.ascending=false;
        this.onSort(event.sort_column);
        }
        else if(event.change_type=='page'){
        this.pageNumber=event.current_page;
        this.onPageChange(this.pageNumber);
        }else if(event.change_type=="pagesize"){
        this.size=event.pagesize;
          this.getdata(this.size.toString());
        }
        
        }
        onSearch(): void {

          var data:GetProductList={
         
            page:1,
            size:this.size,
         
            search:this.searchTerm=="" ?null :this.searchTerm,
            sortBy:this.sortColumn,
            sortOrder:this.ascending ?'asc' :'desc',
          
    
            }
            this.datatable.currentPage=1
            
          this.GetProducts(data);
          
          }

          onSort(column: string): void {


            this.column=column;
            
            this.sortColumn = column;
            var data:GetProductList={
          
              //Page:this.pageNumber,
             
              page:1,
              size:this.size,
         
              search:this.searchTerm=="" ?null :this.searchTerm,
              sortBy:this.sortColumn,
              sortOrder:this.ascending ?'asc' :'desc',
            
         
            
              }
              console.log(data);
              this.datatable.currentPage=1
            this.GetProducts(data);
            }

            onPageChange(pagenum: number): void {
              var data:GetProductList={
             
                page:pagenum,
                size:this.size,
    
                search:this.searchTerm=="" ?null :this.searchTerm,
                sortBy:this.sortColumn,
                sortOrder:this.ascending ?'asc' :'desc',
           
                }
                this.pageNumber=pagenum
              this.GetProducts(data);
              }
              getdata(size:string){
                this.size=parseInt(size);
                var data:GetProductList={
             
              
                  page:this.pageNumber *this.size >this.totalCount ? 1 :this.pageNumber,
                  size:parseInt(size),
                  search:this.searchTerm=="" ?null :this.searchTerm,
                  sortBy:this.sortColumn,
                  sortOrder:this.ascending ?'asc' :'desc',
                
                  }
                  console.log(size);
                  
                  this.GetProducts(data);
                }


                Update(value:number){
                 
              this.isModalOpen=true
this.state='Update'
                  var data=this.rows.filter(a=>a.id==value)[0]
               
                  
                  sessionStorage.setItem("UpdatedID",value.toString())
                  this.form.get("name")?.setValue(data.name);
                  this.form.get("price")?.setValue(data.price);
                  this.form.get("QuantityInStock")?.setValue(data.quantityInStock);
                  this.form.get("Title")?.setValue(data.title);
                  this.form.get("Description")?.setValue(data.description);
                  
                  
                  
                  
                  
                  }
                  
                  /////////////////////////////////////////////////////////Function called to update Record
                  UpdateRecord(){
                  
                    var data=this.form.value as ProductDTO
                    data.id=parseInt(sessionStorage.getItem("UpdatedID")!)
                
                  
                  this.serv.updateProduct(data).subscribe((result:any)=>{
                  
                      
                        const toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          showCloseButton: true,
                          customClass: {
                              popup: `bg-success`
                          },
                        
                      });
                     
                      toast.fire({
                          title: "Updated Successfully",
                      });
                    this.isModalOpen=false;
                      var RefreshData:GetProductList={
                        page: this.pageNumber,
                      
              
                        size: this.size,
                        
                        search:this.searchTerm=="" ?null :this.searchTerm,
                        sortBy: this.sortColumn,
                        sortOrder: this.ascending ? 'asc' : 'desc',
                       
                      
                      }
                      setTimeout(()=>{
                        this.GetProducts(RefreshData)
                      },500)
                      })
                      
                    
                  
                    
                  
                  
                  }
                  handle(){
                    if(this.state=='Create'){
                      this.save()
                    }else{
                      this.UpdateRecord()
                    }
                  }
                  
  }



