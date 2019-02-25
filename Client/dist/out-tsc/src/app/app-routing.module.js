"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var robots_component_1 = require("./robots/robots.component");
var robots_grid_component_1 = require("./robots/robots-grid.component");
var robot_edit_component_1 = require("./robots/robot-edit.component");
var robot_edit_reactive_component_1 = require("./robots/robot-edit-reactive.component");
var routes = [
    { path: 'robots', component: robots_component_1.RobotsComponent },
    //{ path: 'robots/:id', component: RobotEditComponent},
    { path: 'robots/:id', component: robot_edit_reactive_component_1.RobotEditReactiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/robots' } //catch any unfound routes and redirect to home page
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.components = [robots_component_1.RobotsComponent, robots_grid_component_1.RobotsGridComponent, robot_edit_component_1.RobotEditComponent, robot_edit_reactive_component_1.RobotEditReactiveComponent];
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map