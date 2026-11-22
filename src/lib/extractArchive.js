import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import * as tar from "tar";

import { getArchiveName } from "./getArchiveName.js";

export async function extractArchive(packageName, version) {
  fs.mkdirSync(path.join("node_modules", packageName), { recursive: true });
  await tar.extract({
      file: getArchiveName(packageName, version),
      cwd: path.join(cwd(), "node_modules", packageName),
      strip: 1,
  });
  fs.rmSync(getArchiveName(packageName, version));
}
