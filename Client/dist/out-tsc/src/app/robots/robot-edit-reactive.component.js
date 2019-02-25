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
var forms_1 = require("@angular/forms");
var data_service_1 = require("../core/data.service");
var validation_service_1 = require("../shared/validation.service");
var RobotEditReactiveComponent = /** @class */ (function () {
    function RobotEditReactiveComponent(router, route, dataService, formBuilder) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.robot = {
            code: '',
            name: '',
            description: '',
            price: 0.00
        };
        this.operationText = 'Insert';
    }
    RobotEditReactiveComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getRobot(id);
        }
        this.buildForm();
    };
    RobotEditReactiveComponent.prototype.getRobot = function (id) {
        var _this = this;
        this.dataService.getRobot(id)
            .subscribe(function (robot) {
            _this.robot = robot;
            _this.buildForm();
        }, function (err) { return console.log(err); });
    };
    RobotEditReactiveComponent.prototype.buildForm = function () {
        this.robotForm = this.formBuilder.group({
            code: [this.robot.code, forms_1.Validators.required],
            name: [this.robot.name, forms_1.Validators.required],
            description: [this.robot.description, forms_1.Validators.required],
            price: [this.robot.price, [forms_1.Validators.required, validation_service_1.ValidationService.priceValidator]]
        });
    };
    RobotEditReactiveComponent.prototype.submit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value.id = this.robot.id;
        if (value.id) {
            this.dataService.updateRobot(value)
                .subscribe(function (robot) {
                if (robot) {
                    _this.router.navigate(['/robots']);
                }
                else {
                    _this.errorMessage = 'Unable to save robot';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertRobot(value)
                .subscribe(function (robot) {
                if (robot) {
                    _this.router.navigate(['/robots']);
                }
                else {
                    _this.errorMessage = 'Unable to add robot';
                }
            }, function (err) { return console.log(err); });
        }
    };
    RobotEditReactiveComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/robots']);
    };
    RobotEditReactiveComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteRobot(this.robot.id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/robots']);
            }
            else {
                _this.errorMessage = 'Unable to delete robot';
            }
        }, function (err) { return console.log(err); });
    };
    RobotEditReactiveComponent = __decorate([
        core_1.Component({
            selector: 'robot-edit-reactive',
            templateUrl: './robot-edit-reactive.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService,
            forms_1.FormBuilder])
    ], RobotEditReactiveComponent);
    return RobotEditReactiveComponent;
}());
exports.RobotEditReactiveComponent = RobotEditReactiveComponent;
//# sourceMappingURL=robot-edit-reactive.component.js.map