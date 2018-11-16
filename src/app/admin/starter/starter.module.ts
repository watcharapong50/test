import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModuleAdmin } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { NgForm } from '@angular/forms';
import { FormsModule } from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModuleAdmin,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    // NgForm,
    FormsModule,

  ],
  declarations: [StarterComponent]
})

export class StarterModule { }
