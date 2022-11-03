// 合併型
let value: number | string = 1
value = 'hello'


// オブジェクト
interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: number;
  baz: boolean;
}

type HogePiyo = Hoge | Piyo;

const obj: HogePiyo = {
  foo: 'hello',
  bar: 0,
};
const obj1: HogePiyo = {
  foo: 0,
  baz: false,
};

function useHogePiyo(obj: Hoge | Piyo): void {
  // ここでは obj は Hoge | Piyo型 わからない
  if ('bar' in obj) {
    // bar プロパティがあるのは Hoge型 なのでここでは obj は Hoge型
    console.log('Hoge', obj.bar);
  } else {
    // bar プロパティがないのでここでは obj は Piyo型
    console.log('Piyo', obj.baz);
  }
}

const obj3: Hoge | Piyo = {
  foo: 123,
  bar: 0,
  baz: true,
};
// useHogePiyo では、Hoge型 になってしまう

function func(value: string | number): number {
  if ('string' === typeof value) {
    // value は string 型なので length プロパティを見ることができる
    return value.length;
  } else {
    // valueはnumber型
    return value;
  }
}


interface Some<T> {
  type: 'Some';
  value: T;
}
interface None {
  type: 'None';
}
interface More<T> {
  type: 'More';
  value: T;
}
type Option<T> = Some<T> | None | More<T>;

function map<T, U>(obj: Option<T>, f: (obj: T)=> U): Option<U> {
  if (obj.type === 'Some') {
    // ここではobjはSome<T>型
    return {
      type: 'Some',
      value: f(obj.value),
    };
  } else {
    return {
      type: 'None',
    };
  }
}

// 拡張性がある
// Option<T> が拡大すると if分では対応に気づかない
//   switch だとコンパイルエラーがでる
function newMap<T, U>(obj: Option<T>, f: (obj: T)=> U): Option<U> {
  switch (obj.type) {
    case 'Some':
      return {
        type: 'Some',
        value: f(obj.value),
      };
    case 'None':
      return {
        type: 'None',
      };
  }
}