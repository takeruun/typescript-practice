// ----------- //

// function myFilter(arr, predicate) {
//   const result = [];
//   for (const elm of arr) {
//     if (predicate(elm)) {
//       result.push(elm);
//     }
//   }
//   return result;
// }

function myFilter<T>(arr: Array<T>, predicate:(elm: T)=>boolean) {
  const result: Array<T> = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}
const res = myFilter([1, 2, 3, 4, 5], num => num % 2 === 0);
const res2 = myFilter(['foo', 'hoge', 'bar'], str => str.length >= 4);


// ----------- //
// type Speed = ??;
type Speed = 'slow' | 'medium' | 'fast';

function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

const slowSpeed = getSpeed("slow");
const mediumSpeed = getSpeed("medium");
const fastSpeed = getSpeed("fast");

getSpeed("veryfast");



// ----------- //

declare function addEventListener(arg1: string, arg2: void, arg3?: boolean)

addEventListener("foobar", () => {});
addEventListener("event", () => {}, true);
addEventListener("event2", () => {}, {});
addEventListener("event3", () => {}, {
  capture: true,
  once: false
});

addEventListener("foobar", () => {}, "string");
addEventListener("hoge", () => {}, {
  capture: true,
  once: false,
  excess: true
});


// 2.3
// ----------- //

function giveId<T>(obj: T): T & {id: string} {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id
  };
}

// 使用例
const obj1: {
  id: string;
  foo: number;
} = giveId({ foo: 123 });
const obj2: {
  id: string;
  num: number;
  hoge: boolean;
} = giveId({
  num: 0,
  hoge: true
});

// エラー
const obj3: {
  id: string;
  piyo: string;
} = giveId({
  foo: "bar"
});


// 2.5
// ----------- //

declare function useState<T>(state: T): [T, (state: T | ((state: T) => T)) => void]

const [numState, setNumState] = useState(0);
setNumState(3);
setNumState((state: number) => state + 10);


// 3.1
// ----------- //

function mapFromArray<T, U extends keyof T>(arr: Array<T>, key: U): Map<T[U],T> {
  const result = new Map();
  for (const obj of arr) {
    result.set(obj[key], obj);
  }
  return result;
}

const data = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Mary Sue" },
  { id: 100, name: "Taro Yamada" }
];
const dataMap = mapFromArray(data, "id");

// エラー例
mapFromArray(data, "age");


// 3.2
// ----------- //

type MyPartial<T> = {[P in keyof T]?: T[P]};
type T1 = MyPartial<{
  foo: number;
  bar: string;
}>;
type T2 = MyPartial<{
  hoge: {
    piyo: number;
  };
}>;


// 3.3
// ----------- //

interface EventPayloads {
  start: {
    user: string;
  };
  stop: {
    user: string;
    after: number;
  };
  end: {};
}

class EventDischarger<E> {
  emit<K extends keyof E>(eventName: K, payload: E[K]) {
  }
}

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
  user: "user1"
});
ed.emit("stop", {
  user: "user1",
  after: 3
});
ed.emit("end", {});

// エラー例
ed.emit("start", {
  user: "user2",
  after: 0
});
ed.emit("stop", {
  user: "user2"
});
ed.emit("foobar", {
  foo: 123
});


// 3.4
// ----------- //

const reducer = (state: number, action: {type: 'increment', amount: number}|{type: 'decrement', amount: number}|{type: 'reset', value: number}) => {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;
    case "reset":
      return action.value;
  }
};

reducer(100, {
    type: 'increment',
    amount: 10,
}) === 110;
reducer(100, {
    type: 'decrement',
    amount: 55,
}) === 45;
reducer(500, {
    type: 'reset',
    value: 0,
}) === 0;

// エラー
reducer(0,{
    type: 'increment',
    value: 100,
});


// 3.5
// ----------- //

type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

const f1: Func<number, number> = num => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

const f3: Func<number | undefined, number> = num => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();

// エラー
const v6: number = f1();


// 4.1
// ----------- //

function getFoo<T extends object>(obj: T): T extends {foo: infer E} ? E : unknown {
  return (obj as any).foo;
}

// numはnumber型
const num = getFoo({
  foo: 123
});
// strはstring型
const str = getFoo({
  foo: "hoge",
  bar: 0
});
// unkはunknown型
const unk = getFoo({
  hoge: true
});

// エラー
getFoo(123);
getFoo(null);


// 4.2
// ----------- //

function giveIdS<T>(obj: T): Pick<T, Exclude<keyof T, "id">> & {id: string} {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id
  };
}

// 使用
/*
 * obj1の型は { foo: number; id: string } 型
 */
const obj1s = giveIdS({ foo: 123 });
/*
 * obj2の型は { num : number; id: string } 型
 */
const obj2s = giveIdS({
  num: 0,
  id: 100,
});
// obj2のidはstring型なので別の文字列を代入できる
obj2s.id = '';


// 4.3
// ----------- //

interface EventPayloads {
  start: {
    user: string;
  };
  stop: {
    user: string;
    after: number;
  };
  end: {};
}


/**
 * ("start" extends keyof E ? "start" | "stop"[] extends "start"[] ? E["start"] : never: never) |
 *    ("stop" extends keyof E ? "start" | "stop"[] extends "stop"[] ? E["stop"] : never: never) 
 */
type SAS = ("start" extends keyof EventPayloads ? "start" | "stop"[] extends "start"[] ? EventPayloads["start"] : never : never)|
            ("stop" extends keyof EventPayloads ? "start" | "stop"[] extends "stop"[] ? EventPayloads["stop"] : never: never) ;
type S = ("start" extends keyof EventPayloads ? "start"[] extends "start"[] ? EventPayloads["start"] : never : never);

type NoUnion<Ev, EvOrig, E> = Ev extends keyof E
  ? EvOrig[] extends Ev[]
    ? E[Ev]
    : never
  : never;

class EventDischargerS<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: NoUnion<Ev,Ev,E>) {}
}

// 使用例
const eds = new EventDischargerS<EventPayloads>();
eds.emit("start", {
  user: "user1"
});
eds.emit("stop", {
  user: "user1",
  after: 3
});
eds.emit("end", {});

// エラー例
eds.emit<"start" | "stop">("stop", {
  user: "user1"
});


// 4.4
// ----------- //

type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T,K>
// type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>;

interface Data {
  foo: number;
  bar: string;
  baz: string;
}
/*
 * PPは { foo?: number; bar?: string; baz: string } 型
 */
type PP = PartiallyPartial<Data, "foo" | "bar">;


// 4.5
// ----------- //

type Sperate<T, K extends keyof T> = K extends keyof T ? PartiallyPartial<T, Exclude<keyof T, K>> : never;
type AtLeastOne<T> = Sperate<T, keyof T>

interface Options {
  foo: number;
  bar: string;
  baz: boolean;
}
function test(options: AtLeastOne<Options>) {
  const { foo, bar, baz } = options;
  // 省略
}
test({
  foo: 123,
  bar: "bar"
});
test({
  baz: true
});

// エラー
test({});


// 4.6
// ----------- //
type Page =
  | {
      page: "top";
    }
  | {
      page: "mypage";
      userName: string;
    }
  | {
      page: "ranking";
      articles: string[];
    };

type PageGenerators = {
  [P in Page['page']]: (page: Extract<Page, { page: P }>) => string
};

const pageGenerators: PageGenerators = {
  top: () => "<p>top page</p>",
  mypage: ({ userName }) => `<p>Hello, ${userName}!</p>`,
  ranking: ({ articles }) =>
    `<h1>ranking</h1>
      <ul>
      ${articles.map(name => `<li>${name}</li>`).join("")}
      </ul>`
};
const renderPage = (page: Page) => pageGenerators[page.page](page as any);




// 4.7
// ----------- //
type KeysOfType<Obj, Val> = {
  [K in keyof Obj]-?: Obj[K] extends Val ? K : never
}[keyof Obj];

// 使用
type Data1 = {
  foo: string;
  bar: number;
  baz: boolean;

  hoge?: string;
  fuga: string;
  piyo?: number;
};

// "foo" | "fuga"
// ※ "hoge" は string | undefiendなので含まない
type StringKeys = KeysOfType<Data1, string>;

function useNumber<Obj>(obj: Obj, key: KeysOfType<Obj, number>) {
  // ヒント: ここはanyを使わざるを得ない
  const num: number = (obj as any)[key];
  return num * 10;
}

declare const data1: Data1;

// これはOK
useNumber(data1, "bar");
// これは型エラー
useNumber(data1, "baz");


// 4.8
// ----------- //

type UndefinedKey<Obj> = {
  [K in keyof Obj]-?: undefined extends Obj[K] ? K : never
}
type MapToNever<Obj> = {
  [K in keyof Obj] : never
}
type OptionalKeys<Obj> = UndefinedKey<MapToNever<Obj>>

// 使用
type Data2 = {
  foo: string;
  bar?: number;
  baz?: boolean;

  hoge: undefined;
  piyo?: undefined;
};

// "bar" | "baz" | "piyo"
type T = OptionalKeys<Data2>;

/**
 * {
    foo: never;
    bar?: undefined;
    baz?: undefined;
    hoge: never;
    piyo?: undefined;
  }
 */
type E = MapToNever<Data2>;
// never を返そうとすると 