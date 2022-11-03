/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
* Extract from T those types that are assignable to U
*/
type Extract<T, U> = T extends U ? T : never;

type T1 = 'foo' | 'bar' | 'baz' | 0 | 2 | 4 | false;

// TExclude は 0 | 2 | 4 | false 型になる
type TExclude = Exclude<T1, string>;

/**
 * ('foo' extends string ? never : 'foo') | 
 *   ('bar' extends string ? never : 'bar') | 
 *      ('baz' extends string ? never : 'baz') |
 *        (0 extends string ? never : 0) | ...
 * ↓
 * never | never | never | 0 | 2 | 4 | false
 * ↓ never は属する値が無い型だから、union では消えてしまう
 */


// TExtract は 'foo' | 'bar' | 'baz' 型になる
type TExtract = Extract<T1, string>;

/**
 * ('foo' extends string ? 'foo' : never) | 
 *   ('bar' extends string ? 'bar' : never) | 
 *      ('baz' extends string ? 'baz' : never) |
 *        (0 extends string ? 0 : never) | ...
 * ↓
 * 'foo' | 'bar' | 'baz' | never | never | never | never
 * ↓ never は属する値が無い型だから、union では消えてしまう
 */


type MyData =
| {
    type: 'foo';
    fooValue: string;
  }
| {
    type: 'bar';
    barValue: number;
  }
| {
    type: 'baz';
  };

// MyData から type: 'foo' を取り除く
type TEFoo = Exclude<MyData, { type: 'foo' }>;


interface MyObj {
  foo: number;
  bar: string;
  baz: boolean;
}

/**
 * MyObj の key から 'baz' を取り除き
 * 　取り除いて残った key の MyObj を取り出す
 */
type T2 = Pick<MyObj, Exclude<keyof MyObj, 'baz'>>;

// Omit として定義してある
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
// Exclude<T, U>のUがnull | undefinedになった版


/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

/**
* Obtain the return type of a function type
*/
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;