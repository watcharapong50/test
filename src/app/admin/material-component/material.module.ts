import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModuleAdmin } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ProfileComponent } from './profile/profile.component';
import { ManageMeterComponent, DialogOverviewExampleDialogMeter } from './manage-meter/manage-meter.component';
import { ManageUserComponent, DialogOverviewExampleDialog2 } from './manage-user/manage-user.component';
import { ElectricBillComponent } from './electric-bill/electric-bill.component';
import { PowerCutComponent } from './power-cut/power-cut.component';
import { AdComponent } from './manage-meter/ad/ad.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModuleAdmin,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [

  ],
  entryComponents: [
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialogMeter
  ],
  declarations: [
    ProfileComponent,
    ManageMeterComponent,
    ManageUserComponent,
    ElectricBillComponent,
    PowerCutComponent,
    AdComponent,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialogMeter,
    SystemSettingComponent
  ]
})

export class MaterialComponentsModule { }
