import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiCallService, RequestMethods } from '../common/api-call.service';
import { ANIMAL_ADD_URL, ANIMAL_BY_USER_URL, ANIMAL_DELETE_URL, ANIMAL_UPDATE_URL, USER_INFO_FETCH, VET_PET_AUTHENTICATION } from '../common/api-constant';
import { AnimalDetail } from '../common/models/animal-detail';

@Injectable({
  providedIn: 'root'
})
export class AnimalInfoService {

  constructor(private apiCalService: ApiCallService) { }

  addAnimalInfo(animalObj: AnimalDetail): Observable<any> {
    const url = ANIMAL_ADD_URL+animalObj.ownerId;
    return this.apiCalService.constructApiCall(RequestMethods.POST, url, animalObj );
  }


  updateAnimalInfo(animalObj: AnimalDetail): Observable<any> {
    const url = ANIMAL_UPDATE_URL+animalObj.ownerId;
    return this.apiCalService.constructApiCall(RequestMethods.PUT, url, animalObj );
  }

  deleteAnimalInfo(animalId: number): Observable<any> {
    const url = ANIMAL_DELETE_URL+ animalId;
    return this.apiCalService.constructApiCall(RequestMethods.DELETE, url, null );
  }

  getAnimalByUser(userId: string): Observable<any> {
    const url = ANIMAL_BY_USER_URL+userId
    return this.apiCalService.constructApiCall(RequestMethods.GET, url, null );
  }


}
