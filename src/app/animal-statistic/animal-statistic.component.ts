import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalStatistic } from '../common/models/animal-stat';
import { AnimalStatisticService } from './animal-statistic.service';

@Component({
  selector: 'app-animal-statistic',
  templateUrl: './animal-statistic.component.html',
  styleUrls: ['./animal-statistic.component.scss']
})
export class AnimalStatisticComponent {
  public animalStatList!: AnimalStatistic[];
  public totalAnimalCount:number = 0;
  constructor(private router: Router,
    private animalStatService: AnimalStatisticService) {  
  }

  ngOnInit(): void {
    this.getAnimalStatData();
  }

  public goToUserView() {
this.router.navigateByUrl("/userAcoountViewPage");
  }

  private getAnimalStatData() {
    this.animalStatService.getAnimalStatistic().subscribe({
      next: value => {
        this.animalStatList = value.animalStatisticList;
        this.totalAnimalCount = value.totalAnimals;
      },
      error: error => {
        alert("Something went wrong. Please try again")
      },
      complete: () => console.log('Complete!')
    });
  }
}
