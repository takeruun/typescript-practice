// T extends U ? X : Y

// DeepReadonly の解決
type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in NonFunctionPropertyNames<T>]: DeepReadonly<T[P]>;
};

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// 1. T が配列の場合、配列以外のオブジェクトの場合、それ以外の場合（すなわちプリミティブの場合）に分岐する
// 2. 配列の場合は DeepReadonlyArray<T> で処理
//      それ以外のオブジェクトは DeepReadonlyObject<T> で処理
//      プリミティブの場合はそのプロパティを考える必要はないため単に T を返す
// 3. DeepReadonlyArray<T> は、要素の型である T を DeepReadonly<T> で再帰的に処理し、配列自体の型は ReadonlyArray<T> により表現
//      T[number] というのは配列である T に対して number型 のプロパティ名でアクセスできるプロパティの型 →→→ 配列 T の要素の型

interface Obj{
  foo: string;
  bar: {
    hoge: number;
  };
  baz: () => number,
  arr: number[]
}

type DeepReadonlyObj = DeepReadonly<Obj>
const readonlyObj: DeepReadonlyObj = {
  foo: 'foo',
  bar: {
    hoge: 3,
  },
  arr: [1]
};
readonlyObj.bar.hoge = 3; // エラー


type N = NonFunctionPropertyNames<Obj>
type N2 = DeepReadonlyObject<Obj>
type N3 = DeepReadonlyArray<{arr: number[]}>