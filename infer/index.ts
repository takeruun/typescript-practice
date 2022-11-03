type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T0 = Unpacked<string>;
// 最後の　: T　になる

type T1 = Unpacked<string[]>;
// T extends (infer U)[] ? U に当てはまる

type T2 = Unpacked<() => string>;
// T extends (...args: any[]) => infer U ? U に当てはまる

type T3 = Unpacked<Promise<string>>;
// T extends Promise<infer U> ? U に当てはまる

type T4 = Unpacked<Promise<string>[]>;
// T extends (infer U)[] ? U に当てはまる

type T5 = Unpacked<Unpacked<Promise<string>[]>>;


type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;

type FuncToString = (num: number) => string;
type ReturnTypeFuncToString = ReturnType<FuncToString>;

type ReturnTypeString = MyReturnType<string>;


type ExtractHelloedPart<S extends string> = S extends `Hello, ${infer P}!` ? P : unknown;

type T6 = ExtractHelloedPart<"Hello, world!">; 
type T7 = ExtractHelloedPart<"Hell, world!">;