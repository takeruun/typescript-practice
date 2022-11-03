interface MyObj {
  foo: string;
  bar?: number;
}

let obj: MyObj = {
  foo: 'string',
};

obj = {
  foo: 'foo',
  bar: 100,
};

interface MyObj1 {
  foo: string;
  bar: number | undefined;
}

// ? をつけるとと | undefined とでは挙動は違う
let obj: MyObj1 = {
  foo: 'string',
};


// exactOptionalPropertyTypes が無効の場合
interface MyObjOFF {
  foo: string;
  bar?: number;
}

// 全部OK
const objoff1: MyObjOFF = { foo: "pichu" };
const objoff2: MyObjOFF = { foo: "pikachu", bar: 25 };
const objoff3: MyObjOFF = { foo: "raichu", bar: undefined };


// exactOptionalPropertyTypes が有効の場合
// exactOptionalPropertyTypes が有効の場合、オプショナルなプロパティに undefined を入れることができない
interface MyObjON {
  foo: string;
  bar?: number;
}

const objon1: MyObjON = { foo: "pichu" };
const objon2: MyObjON = { foo: "pikachu", bar: 25 };
// エラー: Type 'undefined' is not assignable to type 'number'.
const objon3: MyObjON = { foo: "raichu", bar: undefined };

// exactOptionalPropertyTypesが有効の状態で
function func(obj: MyObj) {
  if ("bar" in obj) {
    // ここでは obj.bar は undefined の可能性はなくなる ※エラーでてるけどしかとして。。
    console.log(obj.bar.toFixed(1));
  }
}