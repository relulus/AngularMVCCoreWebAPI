import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IRobot } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'robot-edit-reactive',
  templateUrl: './robot-edit-reactive.component.html'
})
export class RobotEditReactiveComponent implements OnInit {

  robotForm: FormGroup;
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
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getRobot(id);
    }

    this.buildForm();
  }

  getRobot(id: string) {
      this.dataService.getRobot(id)
        .subscribe((robot: IRobot) => {
          this.robot = robot;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.robotForm = this.formBuilder.group({
        code:  [this.robot.code, Validators.required],
        name: [this.robot.name, Validators.required],
        description: [this.robot.description, Validators.required],
        price: [this.robot.price, [Validators.required, ValidationService.priceValidator]]      
      });
  }
  
  
  submit({ value, valid }: { value: IRobot, valid: boolean }) {
      
    value.id = this.robot.id;
         

      if (value.id) {

        this.dataService.updateRobot(value)
          .subscribe((robot: IRobot) => {
            if (robot) {
              this.router.navigate(['/robots']);
            }
            else {
              this.errorMessage = 'Unable to save robot';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertRobot(value)
          .subscribe((robot: IRobot) => {
            if (robot) {
              this.router.navigate(['/robots']);
            }
            else {
              this.errorMessage = 'Unable to add robot';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/robots']);
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
