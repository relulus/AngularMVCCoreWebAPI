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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_prod_1 = require("../../environments/environment.prod");
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.baseUrl = environment_prod_1.environment.apiUrl;
        this.baseRobotsUrl = this.baseUrl + 'robots';
        this.baseStatesUrl = this.baseUrl + 'states';
    }
    DataService.prototype.getRobots = function () {
        return this.http.get(this.baseRobotsUrl)
            .pipe(operators_1.map(function (robots) {
            return robots;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.getRobotsPage = function (page, pageSize) {
        return this.http.get(this.baseRobotsUrl + "/page/" + page + "/" + pageSize, { observe: 'response' })
            .pipe(operators_1.map(function (res) {
            //Need to observe response in order to get to this header (see {observe: 'response'} above)
            var totalRecords = +res.headers.get('x-inlinecount');
            var robots = res.body;
            return {
                results: robots,
                totalRecords: totalRecords
            };
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.getRobot = function (id) {
        return this.http.get(this.baseRobotsUrl + '/' + id)
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.insertRobot = function (robot) {
        return this.http.post(this.baseRobotsUrl, robot)
            .pipe(operators_1.map(function (data) {
            console.log('insertRobot status: ' + data.status);
            return data.robot;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.updateRobot = function (robot) {
        return this.http.put(this.baseRobotsUrl + '/' + robot.id, robot)
            .pipe(operators_1.map(function (data) {
            console.log('updateRobot status: ' + data.status);
            return data.robot;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.deleteRobot = function (id) {
        return this.http.delete(this.baseRobotsUrl + '/' + id)
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            var errMessage = error.error.message;
            return rxjs_1.Observable.throw(errMessage);
        }
        return rxjs_1.Observable.throw(error || 'ASP.NET Core server error');
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map