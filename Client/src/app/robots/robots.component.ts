import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { IRobot, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'robots', 
  templateUrl: './robots.component.html'
})
export class RobotsComponent implements OnInit {

  title: string;
  robots: IRobot[] = [];
  filteredRobots: IRobot[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Robots';
    this.getRobotsPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.robots) {
        let props = ['code', 'name', 'description', 'price'];
        this.filteredRobots = this.dataFilter.filter(this.robots, props, filterText);
    }
    else {
      this.filteredRobots = this.robots;
    }
  }

  pageChanged(page: number) {
    this.getRobotsPage(page);
  }

  getRobotsPage(page: number) {
    this.dataService.getRobotsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IRobot[]>) => {
          this.robots = this.filteredRobots = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getRobotsPage() retrieved robots'));
  }

}
