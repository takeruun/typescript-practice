const value = rand();

// ダウンキャスト
const str = value as number;
console.log(str * 10);

function rand(): string | number {
    if (Math.random() < 0.5) {
        return 'hello';
    } else {
        return 123;
    }
}


const foo = 'foo';
const str1 = foo as number; // エラー

// unknown or any で アップキャスト する
const str2 = foo as unknown as number; 