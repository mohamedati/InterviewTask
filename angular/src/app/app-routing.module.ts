import { authGuard, permissionGuard } from '@abp/ng.core';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch: 'full',
  },
  {
    path:'Client',
    pathMatch: 'full',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    

  }, 
   {
    path:'Cart',
    pathMatch: 'full',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    

  },
  {
    path:'auth',
    pathMatch: 'full',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    

  },
  {
    path:'Home',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)
    

  },
  {

    path: 'Products',
    pathMatch: 'full',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
