import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnimalEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AnimalEditComponent
  ]
})
export class AnimalInfoModule { }
