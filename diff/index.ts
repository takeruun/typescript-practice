// Diff
// A と B の型の差分を推論する型

type A = { a: number, b: string }
type B = { a: number }

type DiffKey<T extends string, U extends string> = (
  & {[P in T]: P }
  & {[P in U]: never }
  & { [x: string]: never }
)[T];

type MyOmit<T, K extends keyof T> = Pick<T, DiffKey<keyof T, K>>;

type Diff<T, U> = MyOmit<T, keyof U & keyof T>;
// $Diff
type WeakDiff<T, U> = Diff<T, U> & {[K in (keyof U & keyof T)]?: T[K]};

type DKeys = DiffKey<'a' | 'b' | 'c', 'a'>


// 1. {[P in T]: P }
type KeyMirror<T extends string> = {[P in T]: P}
type Mirror = KeyMirror<'a' | 'b'>

// 2. {[P in U]: never }
type NeverMap<U extends string> = {[P in U]: never}
type Never = NeverMap<'a' | 'b'> 

// 3. 1と2のintersection types から value型 を参照する
type KeyMirrorAndNeverMap = {
  a: 'a' & never
  b: 'b'
  c: 'c'
}
// string literal types | never が得られる
type T1 = KeyMirrorAndNeverMap['a']
type T2 = KeyMirrorAndNeverMap['b']