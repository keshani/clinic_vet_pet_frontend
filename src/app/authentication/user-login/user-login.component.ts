import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/user-info/user-info.service';
import { AuthService } from '../authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
 
  public userLoginForm: FormGroup;

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
       alert("Succesfully login")
       this.getUserInfoObject(authObj.username);
      },
      error: error => {
        alert ("incorect credentials")
      },
      complete: () => console.log('Complete!')

    });

  }

  private createFormGroup() : FormGroup {
    const groups: any = {};
    groups['username'] = new FormControl('',[Validators.required]);
    groups['password'] = new FormControl('',[Validators.required]);
    return new FormGroup(groups);
  }

  private getUserInfoObject(userId: string) {
    this.userInfoService.getUserInfo(userId).subscribe({
      next: value => {
       this.authService.setLoginUser(value);
       this.router.navigateByUrl("/userInfoPage");
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')

    });
  }
}
