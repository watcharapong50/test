import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
import { ManageMeterComponent } from './manage-meter/manage-meter.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ElectricBillComponent } from './electric-bill/electric-bill.component';
import { PowerCutComponent } from './power-cut/power-cut.component';
import { SystemSettingComponent } from "./system-setting/system-setting.component";

export const MaterialRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },{
    path: 'manageMeterAdmin',
    component: ManageMeterComponent
  }, {
    path: 'manageUserAdmin',
    component: ManageUserComponent
  }, {
    path: 'electricBillAdmin',
    component: ElectricBillComponent
  }, {
    path: 'powerCutAdmin',
    component: PowerCutComponent
  },{
    path: 'SystemSetting',
    component: SystemSettingComponent
  }
];
