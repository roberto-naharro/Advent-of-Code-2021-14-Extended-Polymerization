import R from "ramda";

import { getInputFromFile } from "./input/input";
import { maxMinusMinCharCount, expandPolymerNTimes } from "./app";
import { FileOutput } from "./types";

const app = async () => {
  R.pipe(
    (fileData: FileOutput) =>
      expandPolymerNTimes(fileData.rules)(10)(fileData.input) as string,
    maxMinusMinCharCount,
    console.log
  )(await getInputFromFile());
};

app().then(console.log).catch(console.error);
