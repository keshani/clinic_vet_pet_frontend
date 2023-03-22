import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AnimalDetail } from '../../common/models/animal-detail';
import { AnimalInfoService } from '../../animal-info/animal-info.service';
import { AuthService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/common/models/user-info';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy, OnChanges  {
  @Input() userInfo: any;
  public userInfoForm: FormGroup;
  public userAnimals: AnimalDetail[] = [];
  public selectedAnimal!: AnimalDetail;
  public formUserId:string ="";
  public passUser!: User;
  faPencil = faPencil;
  faTrash = faTrash;

  constructor(
    private userInfoService: UserInfoService,
    private animalinfoService: AnimalInfoService,
    private route: ActivatedRoute
  ) {
    this.userInfoForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.setUpComponetInitialValues();
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo']) {
      this.setUpComponetInitialValues();
    }
  }
  public onSubmitForm() {
    const userObj = this.userInfoForm.getRawValue();
    this.userInfoService.updateUserInfo(userObj).subscribe({
      next: value => {
        alert("User Info Updated")
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')
    });
  }

  public delete(animal: AnimalDetail) {
    this.animalinfoService.deleteAnimalInfo(animal.id).subscribe({
      next: value => {
        alert("Animal Data Deleted")
        this.getUserAnimalList();
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')
    });
  }

  public edit(animal: AnimalDetail) {

    this.selectedAnimal = {... animal};
    this.selectedAnimal.ownerId = this.passUser.userId;
  }

  public onAnimalAddEvent() {
    this.getUserAnimalList();
  }

  private setUpComponetInitialValues() {
    this.setPassDataThroughNavigation();
    this.populateFormData();
    this.getUserAnimalList();
  }
  private createFormGroup(): FormGroup {
    const groups: any = {};
    groups['userFullName'] = new FormControl("", [Validators.required]);
    groups['userId'] = new FormControl("");
    return new FormGroup(groups);
  }

  private getUserAnimalList() {
    const userId = this.passUser.userId;
    this.animalinfoService.getAnimalByUser(userId).subscribe({
      next: value => {
        this.setUserAnimalList(value);
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')
    });
  }

  private setPassDataThroughNavigation() {
    if (this.userInfo) {
      this.passUser = this.userInfo;
    } else {
      this.passUser = JSON.parse(this.route.snapshot.paramMap.get("user") || "");
    }
    this.formUserId = this.passUser.userId;
  }

  private setUserAnimalList(value: any) {
    if (value) {
      this.userAnimals = value;
    }
  }

  private populateFormData() {
    if (this.passUser) {
      this.userInfoForm.patchValue({
        userId: this.passUser.userId,
        userFullName: this.passUser.userFullName
      });
      this.userInfoForm.updateValueAndValidity();
    }
  }
}
