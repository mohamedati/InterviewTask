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






//////////////////////////////////Reset validation before open Create Form
/*
ResetValidation(){
this.myForm.reset();
this.myForm.get("isActive")?.setValue(true)
this.GetActiveCategories()
this.GetActiveBrands()
}

////////////////////////////////////////////////////////Function called When page change
onPageChange(pagenum: number): void {
var data:IGetProduct={
  isActive:this.Active,
  Page:pagenum,
  PageSize:this.size,
  BrandID:this.SelectedBrand,
  Search:this.searchTerm=="" ?null :this.searchTerm,
  SortBy:this.sortColumn,
  SortOrder:this.ascending ?'asc' :'desc',

  Barcode:null,
  CategoryID:this.selectedcategory
  }
  this.pageNumber=pagenum
this.LoadData(data);
}
//////////////////////////////////////////////////////////Function called on Search
onSearch(): void {

var data:IGetProduct={
  isActive:this.Active,
  Page:1,
  PageSize:this.size,
  BrandID:this.SelectedBrand,
  Search:this.searchTerm=="" ?null :this.searchTerm,
  SortBy:this.sortColumn,
  SortOrder:this.ascending ?'asc' :'desc',

  Barcode:null,
CategoryID:this.selectedcategory
  }
  this.datatable.currentPage=1
  
this.LoadData(data);

}
/////////////////////////Function called on sort



/////////////////////////////////Function clled on page size change
getdata(size:string){
this.size=parseInt(size);
var data:IGetProduct={
  isActive:this.Active,
  BrandID:this.SelectedBrand,
  Page:this.pageNumber *this.size >this.totalCount ? 1 :this.pageNumber,
  PageSize:parseInt(size),
  Barcode:null,
  Search:this.searchTerm=="" ?null :this.searchTerm,
  SortBy:this.sortColumn,
  SortOrder:this.ascending ?'asc' :'desc',

CategoryID:null
  }
  console.log(size);
  
  this.LoadData(data);
}


///////////////////////////////////////////Function Called To Get Products into datatable
LoadData(data:IGetProduct){
console.log(data);

this.loadingIndicator=true
this.serv.GetAll(data).subscribe((result:any)=>{
  console.log(result);
  if(result.isSuccess){

    this.rows=result.data.items as unknown as IProduct [];
    this.hasPrev=result.data.hasPreviousPage,
    this.hasnext=result.data.hasNextPage
    this.totalCount=result.data.totalCount,
    this.pageNumber=result.data.pageNumber
    this.totalpages=[]
    for (let index = 0; index < result.data.totalPages; index++) {
      
      this.totalpages.push(index+1);
      
    }

  }
}

)
this.loadingIndicator=false
}

/////////////////////////////////////////Function called to set Update Form
Update(value:number){


var data=this.rows.filter(a=>a.id==value)[0]
this.getCategoryForUpdate(data.categoryID)
this.GetBrandForUpdate(data.brandID);

sessionStorage.setItem("UpdatedID",value.toString())
this.UpdateForm.get("ArName")?.setValue(data.arName);


this.UpdateForm.get("ArDescription")?.setValue(data.arDescription)
this.UpdateForm.get("EnDescription")?.setValue(data.enDescription)

this.UpdateForm.get("ENName")?.setValue(data.enName);
this.UpdateForm.get("BarCode")?.setValue(data.barcode);

this.updateCategory=data.categoryID,
this.UpdateForm.get("BrandID")?.setValue(data.brandID);
this.UpdateForm.get("isActive")?.setValue(data.isActive);





}

/////////////////////////////////////////////////////////Function called to update Record
UpdateRecord(){


const data:IProduct={
  id:parseInt(sessionStorage.getItem("UpdatedID")!),
  arName:this.UpdateForm.get("ArName")?.value,
enName:this.UpdateForm.get("ENName")?.value,
arDescription:this.UpdateForm.get("ArDescription")?.value ?this.UpdateForm.get("ArDescription")?.value :null,
enDescription:this.UpdateForm.get("EnDescription")?.value ?this.UpdateForm.get("EnDescription")?.value :null,
barcode:this.UpdateForm.get("BarCode")?.value,
categoryID:this.updateCategory,
isActive:this.UpdateForm.get("isActive")?.value ?true :false,

brandID:this.UpdateForm.get("BrandID")?.value
}

console.log(data);

this.serv.Update(data).subscribe((result:any)=>{

    if(result.isSuccess){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: `color-success`
        },
      
    });
   
    toast.fire({
        title: this.translate.currentLang=="ae" ?"تم التعديل بنجاح" :"Updated Successfully",
    });
    this.UpdateModal.close();
    var RefreshData:IGetProduct={
      Page: this.pageNumber,
      Barcode:null,
      isActive:this.Active,
      PageSize: this.size,
      BrandID:this.SelectedBrand,
      Search:this.searchTerm=="" ?null :this.searchTerm,
      SortBy: this.sortColumn,
      SortOrder: this.ascending ? 'asc' : 'desc',
     
      CategoryID: this.selectedcategory
    }
    setTimeout(()=>{
      this.LoadData(RefreshData)
    },500)
    }
    
  })

  


}




/////////////////////////////////////Function Calledto Add Record

Add(){
const data:IProduct={
  id:null,
  arName:this.myForm.get("ArName")?.value,
enName:this.myForm.get("ENName")?.value,
arDescription:this.myForm.get("ArDescription")?.value ?this.myForm.get("ArDescription")?.value :null,
enDescription:this.myForm.get("EnDescription")?.value ?this.myForm.get("EnDescription")?.value :null,
barcode:this.myForm.get("BarCode")?.value,
categoryID:this.myForm.get("CategoryID")?.value,

brandID:this.myForm.get("BrandID")?.value,
isActive:this.myForm.get("isActive")?.value ?true :false

}
console.log(data);




this.serv.Create(data).subscribe(
  (result:any)=>{
  if(result.isSuccess){
    console.log(result);
    
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      customClass: {
          popup: `color-success`
      },
    
  });
 
  toast.fire({
      title: this.translate.currentLang=="ae" ?"تم الاضافة بنجاح" :"ِAdded Successfully",
  });
  this.CreateeModal.close()
  var RefreshData:IGetProduct={
    Page:this.pageNumber,
    Barcode:null,
    isActive:this.Active,
    BrandID:this.SelectedBrand,
    PageSize:this.size,
    Search:this.searchTerm=="" ?null :this.searchTerm,
    SortBy:this.sortColumn,
    SortOrder:this.ascending ?'asc' : 'desc',

    CategoryID:this.selectedcategory
  }
  setTimeout(()=>{
    this.LoadData(RefreshData)
  },500)
  
  }
  
})



}


////////////////////////////////////////////Function called on any table Change


///////////////////////////////////////////////////To Get Pagination Info


///////////////////////////Function To Get Permisiions


  /////////////////////////////////////////////////Get Active Categories for Add
  GetActiveCategories(){

      var data:IGetGeneric={
       isActive:true,
        Page:null,
        PageSize:null,
        Search:null,
        SortBy:null,
        SortOrder:null,
        
    
      }
      this.category.GetForDropDown(data).subscribe((result)=>{
   
        this.AddOPrtions=[]

        var x=result.data as unknown as []
        x.forEach((ele:any) => {
        
          
          if(this.translate.currentLang=='ae'){
            var data={id:ele.id,name:ele.arName}
            this.AddOPrtions.push(data)
            //this.DropDownCategory.push(ele.arName)
          }else{
            var data={id:ele.id,name:ele.enName}
            this.AddOPrtions.push(data)
            //this.DropDownCategory.push(ele.enName)
          }
      
       
         
         
          
        });
      })
    }

    GetActiveBrands(){
      var data:IGetGeneric={
Page:null,
PageSize:null,
isActive:true,
Search:null,
SortBy:null,
SortOrder:null,

      }
      this.Brand.GetAll(data).subscribe((result)=>{
        if(result.isSuccess){
          this.AddBrandOPrtions=[]
          result.data.items.forEach((ele:any)=>{
            this.AddBrandOPrtions.push({id:ele.id,name:this.translate.currentLang=='ae' ?ele.arName :ele.enName})

          })

        }
      })
    }


    GetBrandForUpdate(id:number){
      var data:IGetGeneric={
        Page:null,
        PageSize:null,
        isActive:null,
        Search:null,
        SortBy:null,
        SortOrder:null,
    
        getActiveByID:id
                }
                this.Brand.DropDown(data).subscribe((result)=>{
                  if(result.isSuccess){
                    this.UpdateBrandOPrtions=[]
                    var x=result.data as unknown as any[]
                    x.forEach((ele:any)=>{
                      this.UpdateBrandOPrtions.push({id:ele.id,name:this.translate.currentLang=='ae' ?ele.arName :ele.enName})
        
                    })


        
                  }
                })

                console.log( this.UpdateBrandOPrtions);
                
    }

    GetBrands(){
      var data:IGetGeneric={
        Page:null,
        PageSize:null,
        isActive:null,
        Search:null,
        SortBy:null,
        SortOrder:null,
        
                }
                this.Brand.GetAll(data).subscribe((result)=>{
                  if(result.isSuccess){
                    this.Brands=[]
                    result.data.items.forEach((ele:any)=>{
                      this.Brands.push({id:ele.id,name:this.translate.currentLang=='ae' ?ele.arName :ele.enName})
        
                    })
        
                  }
                })
    }

    onBrandChange(){
      var data:IGetProduct={
        isActive:this.Active,
        Page:1,
        PageSize:this.size,
        BrandID:this.SelectedBrand,
        Search:this.searchTerm=="" ?null :this.searchTerm,
        SortBy:this.sortColumn,
        SortOrder:this.ascending ?'asc' :'desc',
    
        Barcode:null,
        CategoryID:this.selectedcategory
        }
        this.datatable.currentPage=1
        this.LoadData(data);
    }


    getCategoryForUpdate(id:number){
      var data:IGetGeneric={
        isActive:null,
         Page:null,
         PageSize:null,
         Search:null,
         SortBy:null,
         SortOrder:null,
     
          getActiveByID:id
     
       }
       this.category.GetForDropDown(data).subscribe((result)=>{
    
         this.updateCategoryOptions=[]

         var x=result.data as unknown as []
         x.forEach((ele:any) => {
         
           
           if(this.translate.currentLang=='ae'){
             var data={id:ele.id,name:ele.arName}
             this.updateCategoryOptions.push(data)
             //this.DropDownCategory.push(ele.arName)
           }else{
             var data={id:ele.id,name:ele.enName}
             this.updateCategoryOptions.push(data)
             //this.DropDownCategory.push(ele.enName)
           }
       
        
          
          
           
         });
       })
    }*/

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



