import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const fr = (n: number) => numberToWords(n, "fr");

test("single digits", () => {
  assert.equal(fr(0), "zéro");
  assert.equal(fr(1), "un");
  assert.equal(fr(9), "neuf");
});

test("teens and tens", () => {
  assert.equal(fr(17), "dix-sept");
  assert.equal(fr(21), "vingt et un");
  assert.equal(fr(42), "quarante-deux");
});

test("the French 70/80/90 irregulars", () => {
  assert.equal(fr(70), "soixante-dix");
  assert.equal(fr(71), "soixante et onze");
  assert.equal(fr(77), "soixante-dix-sept");
  assert.equal(fr(80), "quatre-vingts");
  assert.equal(fr(81), "quatre-vingt-un");
  assert.equal(fr(91), "quatre-vingt-onze");
  assert.equal(fr(99), "quatre-vingt-dix-neuf");
});

test("hundreds and plural agreement", () => {
  assert.equal(fr(100), "cent");
  assert.equal(fr(200), "deux cents");
  assert.equal(fr(201), "deux cent un");
  assert.equal(fr(999), "neuf cent quatre-vingt-dix-neuf");
});

test("thousands drop the plural s", () => {
  assert.equal(fr(1000), "mille");
  assert.equal(fr(1001), "mille un");
  assert.equal(fr(2000), "deux mille");
  assert.equal(fr(80000), "quatre-vingt mille");
  assert.equal(fr(200000), "deux cent mille");
  assert.equal(fr(1234), "mille deux cent trente-quatre");
});

test("millions and milliards", () => {
  assert.equal(fr(1000000), "un million");
  assert.equal(fr(2000000), "deux millions");
  assert.equal(fr(1000000000), "un milliard");
  assert.equal(fr(1000001), "un million un");
});

test("negative numbers", () => {
  assert.equal(fr(-7), "moins sept");
});
