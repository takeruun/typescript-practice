// 何もデータを返さない型

const a: void = undefined;
const b: undefined = a; // エラー void型は undefinedも返さない

function returnNothing(): void {
  console.log('return nothing');
}
console.log(returnNothing()); // undefined が表示される

function bar(): undefined { // エラー
  console.log('world');
}