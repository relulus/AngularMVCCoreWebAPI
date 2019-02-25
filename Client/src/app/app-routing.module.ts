import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RobotsComponent } from './robots/robots.component';
import { RobotsGridComponent } from './robots/robots-grid.component';
import { RobotEditComponent } from './robots/robot-edit.component';
import { RobotEditReactiveComponent } from './robots/robot-edit-reactive.component';

const routes: Routes = [
  { path: 'robots', component: RobotsComponent},
  //{ path: 'robots/:id', component: RobotEditComponent},
  { path: 'robots/:id', component: RobotEditReactiveComponent },
  { path: '**', pathMatch:'full', redirectTo: '/robots' } //catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [ RobotsComponent, RobotsGridComponent, RobotEditComponent, RobotEditReactiveComponent ];
}
