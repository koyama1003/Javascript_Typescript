"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Todo = /** @class */ (function () {
    function Todo(title, body, detail) {
        this.title = title;
        this.body = body;
        this.detail = detail;
    }
    Object.defineProperty(Todo.prototype, "getTitle", {
        get: function () {
            return this.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "setDetail", {
        set: function (value) {
            this.detail = value;
        },
        enumerable: false,
        configurable: true
    });
    Todo.prototype.describe = function () {
        console.log(this.title, this.detail);
    };
    return Todo;
}());
var ExTodo = /** @class */ (function (_super) {
    __extends(ExTodo, _super);
    function ExTodo(title, body, detail) {
        return _super.call(this, title, body, detail) || this;
    }
    return ExTodo;
}(Todo));
var testing = new Todo("test", "body", "desc");
console.log(testing);
testing.setDetail = "rwa";
console.log(testing);
var genericstest = function (arg) {
    console.log(arg.title);
    return arg;
};
genericstest(testing);
