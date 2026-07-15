import { numberToWords, languages } from "./src/index.ts";

console.log(numberToWords(42));          // forty-two (English is the default)
console.log(numberToWords(42, "fr"));    // quarante-deux
console.log(numberToWords(42, "km"));    // សែសិបពីរ

console.log(numberToWords(1234, "en"));  // one thousand two hundred thirty-four
console.log(numberToWords(1234, "fr"));  // mille deux cent trente-quatre
console.log(numberToWords(1234, "km"));  // មួយពាន់ពីររយសាមសិបបួន

console.log(numberToWords(-7, "km"));    // ដកប្រាំពីរ
console.log(languages);                  // [ 'en', 'fr', 'km' ]
