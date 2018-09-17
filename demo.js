var a = '12333';
var arr = [1, 2, 3];
var arr1 = ['a', 1];
var arr2 = [1, 'a'];
var status_;
(function (status_) {
    status_[status_["undefined"] = 1] = "undefined";
    status_[status_["success"] = 2] = "success";
    status_[status_["error"] = 3] = "error";
})(status_ || (status_ = {}));
var _enum = status_.success;
var num;
var fn = function () {
    return 1;
};
function get(name, num) {
    return 'a';
}
function get1(name, num) {
    if (num === void 0) { num = 20; }
    return 'a';
}
function get2() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    return 'a';
}
var arr_;
arr_ = ['asd', 'ad'];
var imp;
imp = function (k, v) {
    return 'asd';
};
var impleteEncrypt = function (key, value) {
    return key + value;
};
var _impleteEncrypt = function (value) {
    return value;
};
_impleteEncrypt(123);
function __impleteEncrypt(value) {
    return value;
}
var __ = __impleteEncrypt;
__('value');
var jsonFn = function (info) {
    return info.name + info.age;
};
jsonFn({ name: 'a', age: 1 });
var Dog = /** @class */ (function () {
    function Dog(name, date) {
        this.name = name;
        this.time = date;
    }
    Dog.prototype.eat = function (food) {
        console.log(this.name);
    };
    return Dog;
}());
var dog = new Dog('哈士奇', new Date());
dog.eat('asd');
