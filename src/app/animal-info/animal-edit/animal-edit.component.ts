import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/authentication.service';
import { UserInfoService } from 'src/app/user-info/user-info.service';
import { AnimalDetail } from 'src/app/common/models/animal-detail';
import { AnimalInfoService } from '../animal-info.service';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.scss']
})

export class AnimalEditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() animalDetail!: AnimalDetail;
  @Input() ownerId: string = "";
  @Output() userAnimalDataChange = new EventEmitter<any>();
  public animalAddEditForm: FormGroup;

  constructor(private router: Router,
    private animalInfoService: AnimalInfoService,
    private authService: AuthService) {
    this.animalAddEditForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.populateFormData();
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animalDetail']) {
      this.populateFormData();
    }
  }

  public updateAnimalDetail() {
    const animalObj = this.animalAddEditForm.getRawValue();
    this.animalInfoService.updateAnimalInfo(animalObj).subscribe({
      next: value => {
        alert("Animal Data Updated")
        this.userAnimalDataChange.emit();
      },
      error: error => {
        alert("Error Occured while updating Animal Data")
      },
      complete: () => console.log('Complete!')
    });
  }

  public addAnimalDetail() {
    const animalObj: AnimalDetail = this.animalAddEditForm.getRawValue();
    animalObj.ownerId = this.ownerId;
    this.animalInfoService.addAnimalInfo(animalObj).subscribe({
      next: value => {
        alert("Animal Data Added")
        this.userAnimalDataChange.emit();
      },
      error: error => {
        alert("Error Occured while adding Animal Data")
      },
      complete: () => console.log('Complete!')
    });
  }

  public clearForm() {
    this.animalAddEditForm.patchValue({
      id: '',
      ownerId: this.animalDetail.ownerId,
      animalName: '',
      animalType: '',
    });
    this.animalAddEditForm.updateValueAndValidity();
  }

  private createFormGroup(): FormGroup {
    const groups: any = {};
    groups['id'] = new FormControl('');
    groups['ownerId'] = new FormControl(this.ownerId);
    groups['animalName'] = new FormControl('', [Validators.required]);
    groups['animalType'] = new FormControl('', [Validators.required]);
    return new FormGroup(groups);
  }

  private populateFormData() {
    if (this.animalDetail) {
      this.animalAddEditForm.patchValue({
        id: this.animalDetail.id,
        ownerId: this.animalDetail.ownerId,
        animalName: this.animalDetail.animalName,
        animalType: this.animalDetail.animalType,
      });
      this.animalAddEditForm.updateValueAndValidity();
    }
  }
}