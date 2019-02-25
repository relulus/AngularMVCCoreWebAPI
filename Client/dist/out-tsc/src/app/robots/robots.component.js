"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_filter_service_1 = require("../core/data-filter.service");
var data_service_1 = require("../core/data.service");
var RobotsComponent = /** @class */ (function () {
    function RobotsComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.robots = [];
        this.filteredRobots = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    RobotsComponent.prototype.ngOnInit = function () {
        this.title = 'Robots';
        this.getRobotsPage(1);
    };
    RobotsComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.robots) {
            var props = ['code', 'name', 'description', 'price'];
            this.filteredRobots = this.dataFilter.filter(this.robots, props, filterText);
        }
        else {
            this.filteredRobots = this.robots;
        }
    };
    RobotsComponent.prototype.pageChanged = function (page) {
        this.getRobotsPage(page);
    };
    RobotsComponent.prototype.getRobotsPage = function (page) {
        var _this = this;
        this.dataService.getRobotsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.robots = _this.filteredRobots = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getRobotsPage() retrieved robots'); });
    };
    RobotsComponent = __decorate([
        core_1.Component({
            selector: 'robots',
            templateUrl: './robots.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            data_filter_service_1.DataFilterService])
    ], RobotsComponent);
    return RobotsComponent;
}());
exports.RobotsComponent = RobotsComponent;
//# sourceMappingURL=robots.component.js.map