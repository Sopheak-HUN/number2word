/**
 * A locale converter receives a validated safe integer (positive, negative,
 * or zero) and returns it spelled out in that language.
 */
export type LocaleConverter = (num: number) => string;
