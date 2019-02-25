"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_module_1 = require("./account.module");
describe('AccountModule', function () {
    var accountModule;
    beforeEach(function () {
        accountModule = new account_module_1.AccountModule();
    });
    it('should create an instance', function () {
        expect(accountModule).toBeTruthy();
    });
});
//# sourceMappingURL=account.module.spec.js.map