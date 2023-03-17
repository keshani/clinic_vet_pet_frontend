import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
export class UserInfoComponent {
  public userInfoForm: FormGroup;
  public userAnimals: AnimalDetail[] = [];
  public selectedAnimal!: AnimalDetail;
  faPencil = faPencil;
  faTrash = faTrash;

  constructor(private router: Router, 
    private userInfoService: UserInfoService,
    private animalinfoService: AnimalInfoService,
    private authService: AuthService) {
    this.userInfoForm = this.createFormGroup();
    
  }

  ngOnInit(): void {
  this.getUserInformation();
  }

  ngOnDestroy(): void {
  }

  public onSubmitForm() {
    const userObj = this.userInfoForm.getRawValue();
    this.userInfoService.updateUserInfo(userObj).subscribe({
      next: value => {
       
        alert("user update")
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
        alert("delete")
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')

    });
  }

  public edit(animal: AnimalDetail) {
    this.selectedAnimal = animal;
    this.selectedAnimal.ownerId = this.authService.getLoginUser().userId;
   // this.changeDetector.detectChanges();
  }

  private createFormGroup() : FormGroup {
    const groups: any = {};
    const userFullName: string = this.authService.getLoginUser().userFullName;
    const userId: string = this.authService.getLoginUser().userId;
    groups['userFullName'] = new FormControl(userFullName,[Validators.required]);
    groups['userId'] = new FormControl(userId);
    return new FormGroup(groups);
  }

  private getUserInformation() {
    const userId = this.authService.getLoginUser().userId;
    this.animalinfoService.getAnimalByUser(userId).subscribe({
      next: value => {
        this.populateFormData(value);
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')

    });

  }

  private populateFormData (value : any) {
          if(value) {
            this.userAnimals = value;

          }

         
  }
}
