interface Obj {
  foo: string;
  bar: number;
}
const str: Obj['foo'] = '123';
const str1: Obj['foo'] = 123; //エラー


function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const obj = {
  foo: 'string',
  bar: 123,
};

console.log(obj['foo']===pick(obj, 'foo'))
const s: string = pick(obj, 'foo');
const n: number = pick(obj, 'bar');
pick(obj, 'baz'); // エラー
