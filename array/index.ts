// number
// <〜> ← ジェネリクス
const numbers: number[] = [1, 2, 3];
const numbers2: Array<number>  = [1, 2, 3];

// string
const strs: string[] = ['Tokyo', 'Osaka'];
const strs2: Array<string> = ['Tokyo', 'Osaka'];

const nijigenHairetsu: number[][] =  [ [20, 20], [30, 21] ];

const mixhairetsu: (string | number | boolean)[] = [1, false, 'Japan'];

// tuple
let profile: [string, number] = ['take', 0];
profile = [0, 'take']; // エラー

function func(x: string, y: number): [string, number] {
  return [x, y];
}

// 可変長
type NumAndStrings = [number, ...string[]];

const numAndStrings: NumAndStrings = [1, 'foo', 'bar'];

type Args = [string, number, boolean];
const funcS = (...args: Args) => args[1];
const s = funcS('foo', 3, true);

type OptinalArgs = [string, number?, boolean?];
const funcO = (...args: OptinalArgs) => args[1];
const o = funcO('foo'); // 

// 関数bindは2つの引数 func と value を取り、
//   新しい関数 (...args: U) => func(value, ...args) を返す
// この関数は、受け取った引数列 args に加えて最初の引数として
//   value を func に渡して呼び出した返り値をそのまま返す関数
// 「U extends any[]」 を指定することで 「...args: U」 を利用できる

function bind<T, U extends any[], R>(
  func: (arg1: T, ...rest: U) => R,
  value: T,
): ((...args: U) => R) {
  return (...args: U) => func(value, ...args);
}

const add = (x: number, y: number) => x + y;
const add1 = bind(add, 1);
console.log(add1(5)); // 6
// 型変数は
// T = number, U = [number], R = number　に推論される
// (arg: number) => number となる
add1('foo');