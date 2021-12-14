import * as fs from "fs";
import * as R from "ramda";
import * as readline from "readline";
import { ExpandRule, FileOutput } from "../types";

const filename = "input.txt";

export const strToExpandRule = (str: string): ExpandRule => ({
  input: str.slice(0, 2),
  output: str.slice(-1),
});

export const getInputFromFile = (): Promise<FileOutput> => {
  return new Promise((resolve, reject) => {
    let output: FileOutput | undefined;
    let lineNumber = 0;
    let lineOperations = (
      ln: number,
      line: string,
      result: FileOutput = { input: '', rules: [] }
    ): FileOutput => {
      if (ln === 1) {
        return { input: line.trim(), rules: result.rules };
      }

      if (ln >= 3) {
        return {
          input: result.input,
          rules: R.concat(result.rules, [strToExpandRule(line.trim())]),
        };
      }

      return result;
    };

    readline
      .createInterface({
        input: fs.createReadStream(filename),
        terminal: false,
      })
      .on("line", function (line) {
        lineNumber++;
        output = lineOperations(lineNumber, line, output);
      })
      .on("error", reject)
      .on("close", () => {
        if (!output) {
          reject(new Error("No input"));
        } else {
          resolve(output);
        }
      });
  });
};
