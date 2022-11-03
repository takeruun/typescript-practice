interface Obj {
  foo: string;
  bar: number;
}

let key: keyof Obj;
key = 'foo';
key = 'bar';

key = 'baz'; // エラー

const symb = Symbol();

const obj = {
    foo: 'str',
    [symb]: 'symb',
};
type ObjType = keyof (typeof obj);
//  "foo" | symb にならない



interface Obj1 {
  [foo: string]: number;
}
type Obj1Key = keyof Obj1;
// string | number になるのは
//  数値の場合も文字列に変換されてしまうから


interface Obj2 {
  [foo: number]: number;
}
type Obj2Key = keyof Obj2;


