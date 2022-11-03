interface Foo<S, T> {
  foo: S;
  bar: T;
}

const obj: Foo<number, string> = {
  foo: 1,
  bar: 'a',
};

class Bar<T> {
  constructor(obj: T) {
  }
}
const obj1 = new Bar<string>('boo');

function func<T>(obj: T): void {
}
func<number>(3);

const newFunc: <T>(obj: T)=> void = func;


function identity<T>(value: T): T {
  return value;
}

// <number> 省略
const value = identity(3);
const str: string = value; // エラー