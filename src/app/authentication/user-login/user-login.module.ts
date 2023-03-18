import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    CommonModule ,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserLoginModule { }
