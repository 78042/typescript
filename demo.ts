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

//两种索引签名：字符串和数字
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
imp = function(k:string,v:string) {//接口已经指定了返回类型，参数名无需一样
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

//检测是否有传入需要的参数（严格出入就是要是用interface）
function ts(obj: { param1: string}) {
	console.log(obj.param1)
}
let o = {param1: 'asds',param2: 123};//这种方式不会经过额外属性检查，所以编译器不会报错
ts(o)

//绕开接口
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
    	color: 'asd',
    	area: 23
    }
}

//let mySquare = createSquare({ colour: "red", width: 100 });
//colour不是接口定义的，在ts中会报错
//解决方法1：使用类型断言绕开这些检查
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
//解决方法2(最佳的方式):添加一个字符串索引签名
interface SquareConfig_ {
    color?: string;
    width?: number;
    [propName: string]: any;
}

//只读属性(变量用const，属性用readonly)
interface Readonly_ {
	readonly x: string;
}
let readyonly_: Readonly_ = {x: '123'};
//readyonly_.x = '14' -> error

let readonly: number[] = [1,2];
let readonly1: ReadonlyArray<number> = readonly;
//readonly1[0] = 1 -> error

//继承接口(可以多继承)
interface Sup1 {
	num1: number
}
interface Sup2 {
	num2: number
}
interface Sub extends Sup1, Sup2 {
	name: string
}
const sub = <Sub>{};//必须这么写
sub.num1 = 1;
sub.num2 = 1;
sub.name = 'a';