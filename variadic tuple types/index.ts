type SNS = [string, number, string];
type SSNSN = [string, ...SNS, number];

function removeFirst<T, Rest extends readonly unknown[]>(
  arr: [T, ...Rest]
): Rest {
  const [, ...rest] = arr;
  return rest;
}

// const arr: [number, number, string]
// 初めの 1:number を抜いている
const arr = removeFirst([1, 2, 3, "foo"]);



function func1<T extends readonly unknown[]>(arr: T): T {
  return arr;
}
function func2<T extends readonly unknown[]>(arr: [...T]): T {
  return arr;
}
// const arr1: number[]
const arr1 = func1([1, 2, 3]);
// const arr2: [number, number, number]
const arr2 = func2([1, 2, 3]);