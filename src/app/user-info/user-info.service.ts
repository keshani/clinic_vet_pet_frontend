import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from '../common/api-call.service';
import { FETCH_ALL_USERS, USER_INFO_ADD, USER_INFO_FETCH, USER_INFO_UPDATE, VET_PET_AUTHENTICATION } from '../common/api-constant';
import { User } from '../common/models/user-info';
import { RequestMethods } from '../common/enum/app-enum';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private apiCalService: ApiCallService) { }

  getUserInfo(userId: string): Observable<any> {
    const url = USER_INFO_FETCH + userId
    return this.apiCalService.constructApiCall(RequestMethods.GET, url, null);
  }

  addUserInfo(userObj: User): Observable<any> {
    const url = USER_INFO_ADD
    return this.apiCalService.constructApiCall(RequestMethods.POST, url, userObj);
  }

  updateUserInfo(userObj: User): Observable<any> {
    const url = USER_INFO_UPDATE + userObj.userId
    return this.apiCalService.constructApiCall(RequestMethods.PUT, url, userObj);
  }

  getAllUserInfo(userDto: any): Observable<any> {
    const url = FETCH_ALL_USERS
    return this.apiCalService.constructApiCall(RequestMethods.GET, url, userDto);
  }
}
