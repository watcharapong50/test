import { Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from './auth/auth.guard';
import { AuthAdminGuard } from "./auth/auth.admin.guard";
import { FullComponentAdmin } from './admin/layouts/full/full.component';
import { FullComponent } from './user/layouts/full/full.component';



export const AppRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '',
    component: FullComponentAdmin,
    canActivate: [AuthAdminGuard],
    children: [{
      path: '',
      redirectTo: '/starterAdmin',
      pathMatch: 'full'
    }, {
      path: '',
      loadChildren: './admin/material-component/material.module#MaterialComponentsModule'
    }, {
      path: 'starterAdmin',
      loadChildren: './admin/starter/starter.module#StarterModule'
    }]
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      redirectTo: '/starter',
      pathMatch: 'full'
    }, {
      path: '',
      loadChildren: './user/material-component/material.module#MaterialComponentsModule'
    }, {
      path: 'starter',
      loadChildren: './user/starter/starter.module#StarterModule'
    }]
  },
  { path: '**', component: PageNotFoundComponent },

];