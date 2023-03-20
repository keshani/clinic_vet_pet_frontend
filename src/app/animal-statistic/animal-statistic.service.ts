import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiCallService } from '../common/api-call.service';
import { ANIMAL_ADD_URL, ANIMAL_BY_USER_URL, ANIMAL_DELETE_URL, ANIMAL_STATISTIC, ANIMAL_UPDATE_URL, VET_PET_AUTHENTICATION } from '../common/api-constant';
import { RequestMethods } from '../common/enum/app-enum';
import { AnimalDetail } from '../common/models/animal-detail';

@Injectable({
  providedIn: 'root'
})
export class AnimalStatisticService {

  constructor(private apiCalService: ApiCallService) { }

  getAnimalStatistic(): Observable<any> {
    const url = ANIMAL_STATISTIC;
    return this.apiCalService.constructApiCall(RequestMethods.GET, url, null);
  }
}
