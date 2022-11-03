// 交差型

interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: string;
  baz: boolean;
}

const obj: Hoge & Piyo = {
  foo: 'foooooooo',
  bar: 3,
  baz: true,
};

type Func = (arg: number) => number;
interface MyObj {
    prop: string;
}

const obj1 : Func | MyObj = { prop: '' };

obj1(123); // エラー



interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: string;
  baz: boolean;
}

type HogeFunc = (arg: Hoge) => number;
type PiyoFunc = (arg: Piyo) => boolean;

declare const func: HogeFunc | PiyoFunc;

// res は number | boolean 型
const res = func({
  foo: 'foo',
  bar: 123,
  baz: false,
});