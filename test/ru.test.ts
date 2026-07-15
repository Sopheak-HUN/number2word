import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const ru = (n: number) => numberToWords(n, "ru");

test("basics", () => {
  assert.equal(ru(0), "ноль");
  assert.equal(ru(21), "двадцать один");
  assert.equal(ru(42), "сорок два");
  assert.equal(ru(100), "сто");
  assert.equal(ru(500), "пятьсот");
});

test("тысяча is feminine and declines", () => {
  assert.equal(ru(1000), "одна тысяча");
  assert.equal(ru(2000), "две тысячи");
  assert.equal(ru(5000), "пять тысяч");
  assert.equal(ru(11000), "одиннадцать тысяч");
  assert.equal(ru(21000), "двадцать одна тысяча");
});

test("миллион declines", () => {
  assert.equal(ru(1000000), "один миллион");
  assert.equal(ru(2000000), "два миллиона");
  assert.equal(ru(5000000), "пять миллионов");
  assert.equal(ru(1000000000), "один миллиард");
});

test("composed numbers", () => {
  assert.equal(ru(1234), "одна тысяча двести тридцать четыре");
});

test("negative numbers", () => {
  assert.equal(ru(-7), "минус семь");
});
