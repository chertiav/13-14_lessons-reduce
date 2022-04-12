'use strict'
function MyArray(){
	this.length = 0;
	for (let index = 0; index < arguments.length; index++) {
		this[index] = arguments[index];
		this.length++;
	}
}

MyArray.prototype = new MyArrayPrototype();

function MyArrayPrototype() {
	//push
	this.push = function push() {
		if (arguments) {
			for (let index = 0; index < arguments.length; index++) {
				this[this.length++] = arguments[index];
			}
			return this.length;
		}
	}
	//reduce
	this.reduce = function reduce(fn, result) {
		if (typeof fn !== 'function'){
			throw new Error(fn + 'is not a function')
		}
		let index = 0;
		if (arguments.length < 2) {
			index = 1;
			result = this[0];
		}
		for (; index < this.length; index++){
			result = fn(result, this[index], index, this);
		}
		return result;
	}
	//reduceRight
	this.reduceRight = function reduceRight(fn, result) {
		if (typeof fn !== 'function'){
			throw new Error(fn + 'is not a function')
		}
		let index = this.length-1;
		if (arguments.length < 2) {
			index = this.length-2;
			result = this[this.length-1];
		}
		for (; index >= 0; index--){
			result = fn(result, this[index], index, this);
		}
		return result;
	}
}


const myArr = new MyArray();
const matrix = new MyArray([0, 1], [2, 3], [4, 5],);

myArr.push('1','2','3','4','5','6','7','8');

console.log(myArr.reduce((a, b) => a + b)); // 12345678
console.log(myArr.reduce((a, b) => a + b, 0)); // 012345678


console.log(myArr.reduceRight((a, b) => a + b)); 87654321
console.log(myArr.reduceRight((a, b) => a + b, 9)); 987654321

console.log(myArr.reduceRight((a, b) => +a + +b)); 36
console.log(myArr.reduceRight((a, b) => +a + +b, 9)); 45

console.log(matrix.reduce((a, b) => a.concat(b), [0, 0])); // [0, 0, 0, 1, 2, 3, 4, 5]
console.log(matrix.reduceRight((a, b) => a.concat(b), [7,9])); // [7, 9, 4, 5, 2, 3, 0, 1]