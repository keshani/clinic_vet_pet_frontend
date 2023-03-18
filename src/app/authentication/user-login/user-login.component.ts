import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/user-info/user-info.service';
import { AuthService } from '../authentication.service';
import { UserRole } from '../../common/enum/app-enum';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {

  public userLoginForm: FormGroup;
  public errorMessage:string ="";
  constructor(private router: Router,
    private authService: AuthService,
    private userInfoService: UserInfoService) {
    this.userLoginForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public onSubmitLoginForm() {
    const authObj = this.userLoginForm.getRawValue();
    this.authService.login(authObj).subscribe({
      next: value => {
        this.errorMessage ="";
        this.getUserInfoObject(authObj.username);
      },
      error: error => {
        this.errorMessage = "Incorrect Login Credentials"
      },
      complete: () => console.log('Complete!')
    });
  }

  private createFormGroup(): FormGroup {
    const groups: any = {};
    groups['username'] = new FormControl('', [Validators.required]);
    groups['password'] = new FormControl('', [Validators.required]);
    return new FormGroup(groups);
  }

  private getUserInfoObject(userId: string) {
    this.userInfoService.getUserInfo(userId).subscribe({
      next: value => {
        this.authService.setLoginUser(value);
        this.navigateUserToPage(value);
      },
      error: error => {
        alert("Something went wrong while fetching user");
      },
      complete: () => console.log('Complete!')
    });
  }

  private navigateUserToPage(value: any) {
    if (this.authService.getLoginUserRoles().includes(UserRole.ROLE_ADMIN)) {
      this.router.navigateByUrl("/userAcoountViewPage");
    } else {
      this.router.navigate(["/userInfoPage", { user: JSON.stringify(value) }]);
    }
  }
}
