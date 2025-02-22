import { eLayoutType, ReplaceableComponentsService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from './primary-layout/primary-layout.component';
import { eThemeLeptonXComponents, ThemeLeptonXModule ,} from '@abp/ng.theme.lepton-x';
import { initLayouts } from '@abp/ng.theme.lepton-x/layouts';
import { Abp } from '@abp/ng.setting-management/proxy/lib/proxy/volo';
@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
   <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {

  constructor(private replaceableComponent: ReplaceableComponentsService) {
  

    this.replaceableComponent.add({
      component: PrimaryLayoutComponent,
      key:eThemeLeptonXComponents.ApplicationLayout,
    });
    
    
}}

// 
