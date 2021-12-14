export type ExpandRule = { input: string; output: string };

export type CharCount = { [char: string]: number };

export type FileOutput = { input: string; rules: ExpandRule[] };
