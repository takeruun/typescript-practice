// こういう場合のアノテーション
function error(message: string): never {
  throw new Error(message);
}

const n: never = 0;

interface Some<T> {
  type: 'Some';
  value: T;
}
interface None {
  type: 'None';
}
type Option<T> = Some<T> | None;

function map<T, U>(obj: Option<T>, f: (obj: T)=> U): Option<U> {
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
    default:
      // ここで obj は never 型になる
      return obj;
  }
}