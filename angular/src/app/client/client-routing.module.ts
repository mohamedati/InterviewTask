import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';


const routes: Routes = [

{path:'',redirectTo:'client',pathMatch:'full'}
,{path:"client",component:ClientComponent},



]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
