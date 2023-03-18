import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginModule } from './authentication/user-login/user-login.module';
import { UserRegistrationModule } from './user-info/user-registration/user-registration.module';
import { HttpClientModule } from '@angular/common/http';
import { AnimalInfoModule } from './animal-info/animal-info.module'
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRegistrationModule,
    UserLoginModule,
    AnimalInfoModule,
    UserInfoModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
