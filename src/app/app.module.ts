import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterseptor } from './auth/auth.interseptor';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { StatusloggingInterseptor } from './auth/statuslogging.interseptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserReducer } from 'src/app/Store/user.reducer';
import { AppState } from './app.state';
import { UserEffects } from './Store/user.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegisterComponent,
    UserEditFormComponent,
    UserItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forRoot({ user: UserReducer}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true,
    },
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StatusloggingInterseptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
