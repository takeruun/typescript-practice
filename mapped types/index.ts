// {[P in K]: T}
// ↑の意味 K型 の値として可能な各文字列 P に対して、型T を持つプロパティ P が存在するようなオブジェクトの型
// ここで P は型変数、K と T は何らかの型。ただし、K は stringの部分型 である必要がある

type Obj1 = {[P in 'foo' | 'bar']: number};
interface Obj2 {
  foo: number;
  bar: number;
}

const obj1: Obj1 = {foo: 3, bar: 5};
const obj2: Obj2 = obj1;
const obj3: Obj1 = obj2;


type PropNullable<T> = {[P in keyof T]: T[P] | null};

interface Foo {
  foo: string;
  bar: number;
}

const obj: PropNullable<Foo> = {
  foo: 'foobar',
  bar: null,
};


interface Bar {
  foo: string;
  bar?: number;
}

type partial<T> = {[P in keyof T]?: T[P]};

type required<T> = {[P in keyof T]-?: T[P]};
type ReqBar = required<Bar>;






function pickFirst<T>(obj: {[P in keyof T]: Array<T[P]>}): {[P in keyof T]: T[P] | undefined} {
  const result: any = {};
  for (const key in obj) {
    result[key] = obj[key][0];
  }
  return result;
}

const obj4 = {
  foo: [0, 1, 2],
  bar: ['foo', 'bar'],
  baz: [],
};

const picked = pickFirst(obj4);
picked.foo; // number | undefined型
picked.bar; // string | undefined型
picked.baz; // undefined型



// mapped typesの限界
interface Obj{
  foo: string;
  bar: {
    hoge: number;
  };
}
type ReadonlyObj = Readonly<Obj>;
// hoge は readonly にならない

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}
type DeepReadonlyObj = DeepReadonly<Obj>
const readonlyObj: DeepReadonlyObj = {
  foo: 'foo',
  bar: {
    hoge: 3,
  },
};
readonlyObj.bar.hoge = 3; // エラー


function readonlyify<T>(obj: T): DeepReadonly<T> {
  // エラー: Excessive stack depth comparing types 'T' and 'DeepReadonly<T>'.
  // どこまで再帰してmapped typeを展開してしまう
  return obj as DeepReadonly<T>;
}
// conditional type で解決
