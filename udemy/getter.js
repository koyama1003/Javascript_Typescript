"use strict";
var Department = /** @class */ (function () {
    function Department(name, id, employees) {
        this.name = name;
        this.employees = employees;
        this.lastReport = employees[0];
    }
    Object.defineProperty(Department.prototype, "mostRecent", {
        get: function () {
            return this.lastReport;
        },
        enumerable: false,
        configurable: true
    });
    Department.describe = function (name) {
        return { name: name };
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    return Department;
}());
console.log(Department.describe("aaa"));
