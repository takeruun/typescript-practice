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




//  union distribution //

type None = { type: 'None' };
type Some<T> = { type: 'Some'; value: T };
type Option<T> = None | Some<T>;

/**
 * ValueOfOption<V>: Option<T>を受け取って、渡されたのがSome型なら中身の値の型を返す。
 * 渡されたのがNone型ならundefinedを返す。
 */
type ValueOfOption<V extends Option<unknown>> = V extends Some<infer R> ? R : undefined;

const opt1: Some<number> = { type: 'Some', value: 123 };
// typeof opt1 は Some<number> なので
// ValueOfOption<typeof opt1> は number
const val1: ValueOfOption<typeof opt1> = 12345;

const opt2: None = { type: 'None' };
// typeof opt2 は None なので
// ValueOfOption<typeof opt2> は undefined
const val2: ValueOfOption<typeof opt2> = undefined;

/**
 * Option<T> 渡すとどうなる？
 * ** Option<T> 型は Some<T> でなない
 *    Option<T> 型の値は None 型である可能性があり、それは Some<T> ではない **
 */

// conditional type の定義に従って undefined なるところが
//   そうでなない！！

// TAU は number | undefined となる
type TAU = ValueOfOption<Option<number>>;

const tau1: TAU = 123;
const tau2: TAU = undefined;

/**
 * 条件型の条件部分の型 V が Option<T> という union 型になっている
 * Option<T> は None | Some<T> という union 型なので、
 * 　このように条件型の条件部分にunion型が来たときに、条件型は特殊な動作をする
 * 「union 型の条件型」が「条件型の union 型」に変換される
 * 
 * 今回のところ
 * V に Option<T>、すなわち None | Some<T> が入り、
 *   条件型の V のところに None と Some<T> がそれぞれ入った2つの条件型が生成され、
 *     それの union になる
 * V extends Some<infer R> ? R : undefined
 * ↓↓↓
 * (None extends Some<infer R> ? R : undefined) | (Some<T> extends Some<infer R> ? R : undefined)
 * 
 */

// 結果側に V がある場合
// この V に対して union distribution が発生して V が置換されるとき、
//    結果部分の V も同時に置換される
type NoneToNull<V extends Option<unknown>> = V extends Some<unknown> ? V : null;
// これは、
//   V が Some<T> なら Some<T> が、None なら null が帰る

/**
 * NoneToNull<Option<T>> の場合
 *   (None extends Some<unknown> ? None : null) | (Some<T> extends Some<unknown> ? Some<T> : null)
 * 
 * に変換される
 * 結果は null | Some<T> となる
 * 
 * ポイントは、分配後の条件型で V だったところが 左 と 右 でそれぞれ None と Some<T> に置換される
 * */

/**
 * 分配されるのは型変数のみで 
 *   条件部分の型が型変数でなければ、union distribution が発生しない
 */

// T1 は undefined
type T1 = Option<number> extends Some<infer R> ? R : undefined;

const val1s: T1 = undefined;

const val2s: T1 = {type: 'Some', value: 123};


/**
 * ** 回避策 **
 * 
 * 型変数で条件分岐したくなったけどunion型が来ても分配してほしくない場合のテクニックとして
 * 何か適当な型で囲むというものがある
 * 配列型で囲むのが簡単
 */
type ValueOfOptionArr<V> = V[] extends Some<infer R>[] ? R : undefined;

// number型
const val1ar: ValueOfOptionArr<Some<number>> = 123;
// undefined型
const val2ar: ValueOfOptionArr<None> = undefined;
// number | undefined ではなく undefined型
const val3ar: ValueOfOptionArr<Option<number>> = undefined;
// ↓なのでこれはエラー
const val4ar: ValueOfOptionArr<Option<number>> = 123;

// この例では、条件部分に来ている V[] はただの型変数ではないので union distribution の発生条件に当てはまらず、分配が発生しない