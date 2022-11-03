
// string型 であるような任意のプロパティ名に対して number型 を持つ
interface MyObj {
  [key: string] : number;
}

const obj: MyObj = {};

// obj.foo が undefined の可能性を無視している　
const num: number = obj.foo;
const num2: number = obj.bar;