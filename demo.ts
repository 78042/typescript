var a:string = '12333';
const arr:number[] = [1,2,3]
const arr1:Array<any> = ['a',1]
const arr2:[number,string]= [1,'a'];
enum status_ {
	undefined= 1,
	success,
	error
}
const _enum:status_ = status_.success;
var num:number|undefined;
const fn = function():number {
	return 1;
}
function get(name:string, num?:number):string {
	return 'a'
}
function get1(name:string, num:number=20):string {
	return 'a'
}
function get2(...num:number[]):string {
	return 'a'
}

interface Arr {
	[index:number]: string;
}
let arr_:Arr;
arr_ = ['asd','ad']
//函数类型接口（函数参数类型:返回类型）
//这样的接口必须返回指定的类型,无法动态传参与返回
interface encrypt {
	(key:string,value:string):string;
}
let imp:encrypt;
imp = function(k:string,v:string) {
	return 'asd';
}
const impleteEncrypt:encrypt = (key:string, value:string) => {
	return key + value;
}
//泛型接口解决上面的问题
interface _encrypt {
	<T>(value:T):T;
}
const _impleteEncrypt:_encrypt = <T>(value:T) => {
	return value;
}
_impleteEncrypt(123)
//以上写法2
interface __encrypt<T> {
	(value:T):T;
}
function __impleteEncrypt<T> (value: T) {
	return value;
}
const __:__encrypt<string> = __impleteEncrypt;
__('value'); 
//属性类接口
interface Json {
	name: string;
	age: number
}

const jsonFn = (info: Json):string => {
	return info.name + info.age;
} 
jsonFn({name:'a',age:1})
//类类型接口
interface Animal {
	time: Date;
	name: string;
	eat(food: string): void;
}

class Dog implements Animal {
	time: Date;
	name: string;
	constructor(name: string, date: Date) {
		this.name = name;
		this.time = date;
	}
	eat(food:string) {
		console.log(this.name)
	}
}

const dog = new Dog('哈士奇',new Date());
dog.eat('asd')