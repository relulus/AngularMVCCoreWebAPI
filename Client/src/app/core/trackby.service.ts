import { Injectable } from '@angular/core';

import { IRobot } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TrackByService {
  
  robot(index: number, robot: IRobot) {
    return robot.id;
  }
  
}