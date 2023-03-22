import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user-info';
import { UserInfoService } from '../user-info.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  public userInfoList!: User[];
  public selectedUser!: User;
  faEye = faEye;
  constructor(private router: Router, 
    private userInfoService: UserInfoService,
    private changeDetector: ChangeDetectorRef) {  
  }

  ngOnInit(): void {
    this.getUsersList();
  }
  public viewUser(userInfo:User) {
    const newUser = {...userInfo};
     this.selectedUser =newUser ;
     this.changeDetector.detectChanges();
  }

 public goToAnimalStatistic() {
   this.router.navigateByUrl("/animalStatisticPage");
 }

  private getUsersList() {
    const userDto = {pageNumber:0, pageSize:10 };
    this.userInfoService.getAllUserInfo(userDto).subscribe({
      next: value => {
        this.userInfoList = value.content;
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')
    });
  }
}
