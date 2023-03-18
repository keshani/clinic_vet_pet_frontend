import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalInfoModule } from '../animal-info/animal-info.module';
import { UserInfoComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';

@NgModule({
  declarations: [
    UserInfoComponent,
    UserViewComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnimalInfoModule
  ]
})
export class UserInfoModule { }
