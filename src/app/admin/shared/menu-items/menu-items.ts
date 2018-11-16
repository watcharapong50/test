import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'starterAdmin', name: 'Statistic', type: 'link', icon: 'assessment' },

  {state: 'manageUserAdmin', type: 'link', name: 'Manage User', icon: 'person_pin'},
  {state: 'manageMeterAdmin', type: 'link', name: 'Manage Meter', icon: 'av_timer' },
  {state: 'electricBillAdmin', type: 'link', name: 'Electric Bill', icon: 'receipt'},
  {state: 'powerCutAdmin', type: 'link', name: 'Power Cut', icon: 'power_off'},
  {state: 'SystemSetting', type: 'link', name: 'System Setting', icon: 'settings'},
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
