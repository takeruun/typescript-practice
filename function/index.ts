// 基本
const f: (foo: string) => number = func;
// 第1引数として string型 の、第2引数として number型 の引数をとり、
//   返り値としてboolean型の値を返す関数の型を定義

// 引数名は同じじゃなくてもよい
function func(arg: string): number {
  return Number(arg);
}

// 関数の部分型
interface MyObj {
  foo: string;
  bar: number;
}

interface MyObj2 {
  foo: string;
}

const a: (obj: MyObj2) => void = () => {};
const b: (obj: MyObj) => void = a;
// MyObj は MyObj2 の部分型なので、
//  MyObj2 を受け取って処理できる関数は MyObj を受け取っても当然処理が可能
// ゆえに、(obj: MyObj2) => void型 の値を (obj: MyObj)=>void型 の値として扱うことができる

const c: (obj: MyObj) => void = () => {};
const d: (obj: MyObj2) => void = c; // エラー　