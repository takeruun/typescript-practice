
// クラスFooを定義したことで、Fooという型も同時に定義される
class Foo {
  method(): void {
    console.log('Hello, world!');
  }
}

const obj: Foo = new Foo();


// notice 
// TypeScriptはあくまで構造的型付けを採用している
// Barというのは次のようなオブジェクト型 (Bar) で代替可能
interface MyBar {
  method: ()=> void;
}

class Bar {
  method(): void {
    console.log('Hello, world!');
  }
}

const myBar: MyBar = new Bar();
const obj2: Bar = myBar;