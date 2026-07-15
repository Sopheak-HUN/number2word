import type { LocaleConverter } from "../types.ts";

const DIGITS = [
  "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín",
] as const;

const SCALES = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"] as const;

function below100(n: number): string {
  if (n < 10) return DIGITS[n]!;
  const one = n % 10;
  if (n < 20) {
    if (!one) return "mười";
    return `mười ${one === 5 ? "lăm" : DIGITS[one]}`;
  }
  let words = `${DIGITS[Math.floor(n / 10)]} mươi`;
  if (one) {
    // một → mốt and năm → lăm after mươi (hai mươi mốt, hai mươi lăm).
    words += ` ${one === 1 ? "mốt" : one === 5 ? "lăm" : DIGITS[one]}`;
  }
  return words;
}

/** `full` pads non-leading groups: 2015 → "hai nghìn không trăm mười lăm". */
function below1000(n: number, full: boolean): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (!hundreds && !full) return below100(n);

  const parts = [`${DIGITS[hundreds]} trăm`];
  if (rest) {
    // linh marks a skipped tens digit: 101 → "một trăm linh một".
    parts.push(rest < 10 ? `linh ${DIGITS[rest]}` : below100(rest));
  }
  return parts.join(" ");
}

function toWordsAbs(n: number): string {
  if (n === 0) return DIGITS[0];

  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    const words = below1000(groups[i]!, i < groups.length - 1);
    parts.push(SCALES[i] ? `${words} ${SCALES[i]}` : words);
  }
  return parts.join(" ");
}

/** Vietnamese: 42 → "bốn mươi hai" */
export const vi: LocaleConverter = (num) =>
  (num < 0 ? "âm " : "") + toWordsAbs(Math.abs(num));
