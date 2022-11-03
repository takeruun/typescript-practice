interface Func {
  (arg: number): void;
}
// このオブジェクトは number型 の引数をひとつ取る関数
const f: Func = (arg: number)=> { console.log(arg); };


// オーバーローディング
function double(value: number):number;
function double(value: string):string;

// 実態は1つ
// string, number しか実行しない
function double(value: number | string): number | string | undefined {
	if(typeof value === 'number'){
		return value * 2;
	} else if(typeof value === 'string'){
		return value + value;
	}
}

//function double(value: number):number {
// return value * 2;
//}

double(100);

//function double(value: string):string {
// return value + value;
//}

double('hello');

double(true); //エラー シグネチャー以外はエラー発生