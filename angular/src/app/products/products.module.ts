import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, NgDataTableComponent } from '@bhplugin/ng-datatable';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

const routes:Routes=[{path:'',redirectTo:'Index',pathMatch:'full'},{path:'Index',component:ProductComponent}]

@NgModule({
  declarations: [ProductComponent],
  imports: [
    NgxCustomModalComponent,
      DataTableModule,
    CommonModule,
FormsModule,
   RouterModule.forChild(routes),
   ThemeSharedModule,
   ReactiveFormsModule 
  ]
})
export class ProductsModule { }
