// number
let a: number = 1;
a = 'sample' // エラー

// string
let b: string = 'n';
b = 1 // エラー

// boolean
let flag: boolean = false;
flag = true
flag = 'true' // エラー

// null
const c: null = null;
const d: string = c; // strictNullChecksがオンならエラー

// symbol
const s1 = Symbol("foo");
const s2 = Symbol("foo");
console.log(s1 === s1); // true
console.log(s1 === s2); // false

// bigint
// n をつける
const n1 = 100n;
const b1 = BigInt(100);
const b2 = BigInt("9007199254740991");



