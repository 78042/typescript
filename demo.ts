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
//函数类型
const fn = function(num:number):number {
	return 1;
}
//完整函数类型(nn和返回值可以不用指定类型了，TypeScript编译器会自动识别出类型)
const fullFn: (n:number) => number = function (nn) {
	return 1;
}

//重载
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
let imp:encrypt;//允许创建一个对接口类型的引用
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
//dog.eat('asd')

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
//解决方法2(最佳的方式(也可以用泛型解决)):添加一个字符串索引签名
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

//抽象类abstract(抽象类中的抽象方法不包含具体实现并且必须在派生类中实现,不能创建一个抽象类的实例)
abstract class Animal1 {
	abstract eat() :void;
	move(): void {
		console.log(1)
	}
}
class Animal1abstract extends Animal1 {
	eat() {
		console.log(1)
	}
	brak() {

	}
}
let fish: Animal1; // 允许创建一个对抽象类型的引用
//Animal1 = new Animal1(); // 错误: 不能创建一个抽象类的实例
fish = new Animal1abstract(); // 允许对一个抽象子类进行实例化和赋值
fish.eat();
fish.move();
//fish.brak(); // 错误: 方法在声明的抽象类中不存在

//this在ts中运用
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
//alert("card: " + pickedCard.card + " of " + pickedCard.suit);


//泛型：使返回值的类型与传入参数的类型是相同的一个函数
function fx1<T> (arg: T):T {
	return arg;
}
function fx2<T> (arg: T[]): T[] {
	return arg;
}
let full_fx1: <T>(arg: T) => T = fx1;
let full_fx2: <U>(arg: U) => U = fx1;//名称对应就可以了

let full_fx3: {<T>(arg: T): T} = fx1;//带有调用签名的对象字面量来定义泛型函数
//1
interface for_fx {
	<T>(arg: T): T;
}
let fx_4: for_fx = fx1;
//2
interface for_fx1<T> {
	<T>(arg: T): T;
}
let fx_5: for_fx1<number> = fx1;


let ret = fx1<string>('asd')
//let ret = fx('asd') ->可以不加<>，因为编译器会自动识别


//泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

//场景：参数必须包含某属性
interface If {
	num: number
}
function fx_<T extends If>(arg: T): T {
	console.log(arg.num)
	return arg;
}
//fx_('asd') ->报错
fx_({num:123,ad: 123})

//枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
//Up使用初始化为 1。 其余的成员会从 1开始自动增长,Up不赋值时，默认为0


//----------------------额外补充es6
// for..in可以操作任何对象；它提供了查看对象属性的一种方法。 但是 for..of关注于迭代对象的值
// let pets = new Set(["Cat", "Dog", "Hamster"]);
// pets["species"] = "mammals";

// for (let pet in pets) {
//     console.log(pet); // "species"
// }

// for (let pet of pets) {
//     console.log(pet); // "Cat", "Dog", "Hamster"
// }