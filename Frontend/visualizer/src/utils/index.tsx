import { ReactNode } from "react";

interface FormatNumberOptions {
  /**
   * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   */
  fractionDigits?: number;
  /**
   * A fallback react tree to show when a number is invalid.
   * @default `---`
   */
  fallback?: ReactNode;
  /**
   * The string used to separate number.
   */
  delimiter?: string;
  /**
   * Allow zero after decimal point.
   * @default false
   */
  padZero?: boolean;
  /**
   * A string that will be appended to the beginning of the returned result.
   */
  prefix?: string;
  /**
   * A string that will be appended to the ending of the returned result.
   */
  suffix?: string;
}

export function isNumeric(num: any) {
  return !isNaN(num) && !isNaN(parseFloat(num));
}

export function formatNumber(
  number: any,
  options?: FormatNumberOptions
): string | FormatNumberOptions["fallback"] {
  const {
    fallback = "---",
    fractionDigits,
    delimiter,
    padZero,
    prefix,
    suffix,
  } = options ?? {};

  if (!isNumeric(number)) {
    return fallback;
  }

  let num: number | string = parseFloat(number);
  if (isNumeric(fractionDigits)) {
    num = num.toFixed(fractionDigits);
  }
  if (!padZero) {
    num = Number(num); // remove last zeros
  }
  return (prefix ?? "") + numberWithCommas(num, delimiter) + (suffix ?? "");
}

/**
 * Compact large number
 * @param {*} n The number
 * @param {Number} fractionDigits Number of digits after the decimal point
 */
export function compactNumber(n: number | string, fractionDigits = 1) {
  if (!isNumeric(n)) {
    throw new Error("Must provide a correct number");
  }
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor((("" + parseInt("" + n)).length - 1) / 3);

  let shortValue = (Number(n) / Math.pow(1000, suffixNum)).toPrecision(
    fractionDigits + 1
  );

  if (Number(shortValue) % 1 !== 0) {
    shortValue = Number(shortValue).toFixed(fractionDigits);
  }

  return Number(shortValue).toLocaleString() + suffixes[suffixNum];
}

export function numberWithCommas(x: number | string, delimiter = ","): string {
  if (!isNumeric(x)) {
    throw new Error("Must provide a correct number");
  }
  const [naturalPart, decimalPart] = x.toString().split(".");
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  if (decimalPart) {
    out += "." + decimalPart;
  }
  return out;
}
