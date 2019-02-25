import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IRobot } from '../shared/interfaces';

@Component({
  selector: 'robot-edit',
  templateUrl: './robot-edit.component.html'
})
export class RobotEditComponent implements OnInit {

  robot: IRobot = {
    code: '',
    name: '',
    description: '',
    price: 0.00
  };

  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getRobot(id);
    }

  }

  getRobot(id: string) {
      this.dataService.getRobot(id)
        .subscribe((robot: IRobot) => {
          this.robot = robot;
        },
        (err: any) => console.log(err));
  }

  
  submit() {

      if (this.robot.id) {

        this.dataService.updateRobot(this.robot)
          .subscribe((robot: IRobot) => {
            if (robot) {
              this.router.navigate(['/robots']);
            } else {
              this.errorMessage = 'Unable to save robot';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertRobot(this.robot)
          .subscribe((robot: IRobot) => {
            if (robot) {
              this.router.navigate(['/robots']);
            }
            else {
              this.errorMessage = 'Unable to add robot';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteRobot(this.robot.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/robots']);
          }
          else {
            this.errorMessage = 'Unable to delete robot';
          }
        },
        (err) => console.log(err));
  }

}
