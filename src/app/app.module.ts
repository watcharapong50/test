import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FullComponentAdmin } from './admin/layouts/full/full.component';
import { AppHeaderComponentAdmin } from './admin/layouts/full/header/header.component';
import { AppSidebarComponentAdmin } from './admin/layouts/full/sidebar/sidebar.component';
import { DemoMaterialModuleAdmin } from './admin/demo-material-module';
import { SharedModuleAdmin } from './admin/shared/shared.module';

import { FullComponent } from './user/layouts/full/full.component';
import { AppHeaderComponent } from './user/layouts/full/header/header.component';
import { AppSidebarComponent } from './user/layouts/full/sidebar/sidebar.component';
import { DemoMaterialModule } from './user/demo-material-module';
import { SharedModule } from './user/shared/shared.module';

import { SpinnerComponent } from './shared/spinner.component';

//routes
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './login/sign-in/sign-in.component';



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,

    FullComponentAdmin,
    AppHeaderComponentAdmin,
    AppSidebarComponentAdmin,

    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,

    LoginComponent,
    PageNotFoundComponent,
    SignInComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),

    SharedModuleAdmin,
    DemoMaterialModuleAdmin,
    SharedModule,
    DemoMaterialModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
