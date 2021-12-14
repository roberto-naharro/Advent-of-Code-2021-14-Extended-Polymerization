import R from "ramda";
import { CharCount, ExpandRule } from "./types";

export const expand = (rule: ExpandRule) =>
  R.pipe(R.split(""), R.join(rule.output))(rule.input);

export const applyExpandRule = (pairIn: string) =>
  R.ifElse(
    (rule: ExpandRule) => rule.input === pairIn,
    (rule: ExpandRule) => expand(rule),
    () => pairIn
  );

export const toPairs = R.pipe(
  R.split(""),
  R.reduce((acc: string[], elem: string) => {
    const last = R.last(acc);
    if (!last) {
      return [elem];
    } else if (last.length === 1) {
      return [last + elem];
    } else {
      return [...acc, R.last(last) + elem];
    }
  }, [])
);

export const joinPolymer = R.reduce(
  (reduced: string, pair: string) => R.slice(0, -1, reduced) + pair,
  ""
);

export const expandPolymer = (rules: ExpandRule[]) =>
  R.pipe(
    toPairs,
    R.map((pair: string) =>
      R.reduce((acc, rule) => applyExpandRule(acc)(rule), pair, rules)
    ),
    joinPolymer
  );

export const repeatFn =
  <T>(times: number, fn: (arg: T) => T) =>
  (arg: T) => {
    if (times <= 0) return undefined;
    let acc = fn(arg);
    for (let i = 1; i < times; i++) {
      acc = fn(acc);
    }
    return acc;
  };

export const expandPolymerNTimes = (rules: ExpandRule[]) => (times: number) =>
  repeatFn(times, expandPolymer(rules));

export const charCounts = R.pipe(
  R.split(""),
  R.reduce<string, CharCount>(
    (counts, char) => ({
      ...counts,
      [char]: (counts[char] ?? 0) + 1,
    }),
    {}
  )
);

export const maxMinusMinCharCount = R.pipe(
  charCounts,
  R.values,
  R.reduce<number, { min: number; max: number }>(
    (minMax, curValue) => ({
      min: R.min(minMax.min, curValue),
      max: R.max(minMax.max, curValue),
    }),
    {
      min: Infinity,
      max: 0,
    }
  ),
  (o) => o.max - o.min
);
