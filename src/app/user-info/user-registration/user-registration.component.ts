import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
 
  public userRegisterForm: FormGroup;
  public errorMessage: string=""
  constructor(private router: Router, 
    private userInfoService: UserInfoService) {
    this.userRegisterForm = this.createFormGroup();
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
  }

  public onSubmitRegisterForm() {
    const userObj = this.userRegisterForm.getRawValue();
    this.userInfoService.addUserInfo(userObj).subscribe({
      next: value => {
        alert("User Successfully Registered")
        this.router.navigateByUrl("/userLoginForm");
      },
      error: error => {
        const errMsg = error.error.message;
       this.errorMessage = errMsg;
      },
      complete: () => console.log('Complete!')
    });
  }

  private createFormGroup() : FormGroup {
    const groups: any = {};
    groups['userFullName'] = new FormControl('',[Validators.required]);
    groups['userId'] = new FormControl('',[Validators.required]);
    groups['password'] = new FormControl('',[Validators.required]);
    return new FormGroup(groups);
  }
}
