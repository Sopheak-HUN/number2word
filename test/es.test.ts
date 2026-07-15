import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const es = (n: number) => numberToWords(n, "es");

test("basics", () => {
  assert.equal(es(0), "cero");
  assert.equal(es(16), "dieciséis");
  assert.equal(es(21), "veintiuno");
  assert.equal(es(42), "cuarenta y dos");
});

test("hundreds: cien vs ciento", () => {
  assert.equal(es(100), "cien");
  assert.equal(es(101), "ciento uno");
  assert.equal(es(500), "quinientos");
  assert.equal(es(999), "novecientos noventa y nueve");
});

test("thousands with apocope", () => {
  assert.equal(es(1000), "mil");
  assert.equal(es(1234), "mil doscientos treinta y cuatro");
  assert.equal(es(21000), "veintiún mil");
  assert.equal(es(31000), "treinta y un mil");
  assert.equal(es(100000), "cien mil");
});

test("long scale: millón, mil millones, billón", () => {
  assert.equal(es(1000000), "un millón");
  assert.equal(es(2000000), "dos millones");
  assert.equal(es(1000000000), "mil millones");
  assert.equal(es(1000000000000), "un billón");
});

test("negative numbers", () => {
  assert.equal(es(-7), "menos siete");
});
