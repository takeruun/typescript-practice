type HelloStr = `Hello, ${string}`;

const str1: HelloStr = "Hello, world!";
const str2: HelloStr = "Hello, uhyo";

const str3: HelloStr = "Hell, world!"; // エラー


type PriceStr = `${number}円`;

const num1: PriceStr = "100円";
const num2: PriceStr = "-50円";
const num3: PriceStr = "3.14円"
const num4: PriceStr = "1e100円";

const num5: PriceStr = "1_000_000円";
const num6: PriceStr = "円";


const world: string = "world";

// string型
const conststr1 = `Hello, ${world}!`;

const conststr2 = `Hello, ${world}!` as const;
// `Hello, ${string}!` にできる


type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

const l: AllLocaleIDs = 'welcome_email_id';
const l1: AllLocaleIDs = 'welcome_email';