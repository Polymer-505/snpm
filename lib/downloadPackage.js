import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import { getArchiveName } from "./getArchiveName.js";

export async function downloadPackage(packageName, version, link) {
  const response = await fetch(link);
  if (!response.ok) {
    console.error(response.status);
  }

  await pipeline(
    response.body,
    fs.createWriteStream(getArchiveName(packageName, version)),
  );
}
