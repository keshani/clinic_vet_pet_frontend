import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './authentication/user-login/user-login.component';
import { UserRegistrationComponent } from './user-info/user-registration/user-registration.component';
import { UserInfoComponent } from './user-info/user-edit/user-edit.component';
import { UserViewComponent } from './user-info/user-view/user-view.component';
import { AnimalStatisticComponent } from './animal-statistic/animal-statistic.component';

const routes: Routes = [
  {
    path: '',
    component: UserRegistrationComponent
  },
  {
    path: 'userLoginForm',
    component: UserLoginComponent
  },
  {
    path: 'userInfoPage',
    component: UserInfoComponent
  },
  {
    path: 'userRegistrationPage',
    component: UserRegistrationComponent
  },
  {
    path: 'userAcoountViewPage',
    component: UserViewComponent
  },
  {
    path: 'animalStatisticPage',
    component: AnimalStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
