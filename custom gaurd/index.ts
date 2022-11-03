type FooObj = { foo: number };


/**
 * arg is FooObj  (引数名 is 型)
 * がカスタム型ガード
 */
function isFooObj(arg: any): arg is FooObj {
  return arg != null && 'number' === typeof arg.foo;
}

function useFoo(arg: unknown) {
  if (isFooObj(arg)) {
    // この中ではargはFooObj型
    console.log(arg.foo);
  }
}

useFoo(123);
useFoo({foo: 456});