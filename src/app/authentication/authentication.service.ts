import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiCallService, RequestMethods } from '../common/api-call.service';
import { VET_PET_AUTHENTICATION } from '../common/api-constant';
import { User } from '../common/models/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInUser!: User;

  constructor(private apiCalService: ApiCallService) { }

  login(authObject: any): Observable<any> {
    return this.apiCalService.constructApiCall(RequestMethods.POST, VET_PET_AUTHENTICATION, authObject )
      .pipe(
        tap((response:any) => {
          if (response.jwtToken) {
            localStorage.setItem('access_token', response.jwtToken);
            this.loggedIn.next(true);
          }
        })
      );
  }



  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoginUser(user: any) {
    localStorage.setItem("userObj", user );
    this.loggedInUser = user;
    
  }

  getLoginUser(): User{
    return this.loggedInUser;
    
  }
  getLoginUserId(): string {
    if(this.loggedInUser )  {
      return this.loggedInUser.userId;
    }
    return "";
  }

  getLoginUserFullName(): string {
    if(this.loggedInUser )  {
      return this.loggedInUser.userFullName;
    }
    return "";
  }
}
