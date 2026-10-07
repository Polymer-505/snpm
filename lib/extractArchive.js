import fs from "node:fs";

import { tarExtractor } from "./tar.js";
import { getArchiveName } from "./getArchiveName.js";

export function extractArchive(packageName, version) {
  tarExtractor(packageName, version);
  fs.rmSync(getArchiveName(packageName, version));
  console.log(`${packageName} has been successfuly installed`);
}
