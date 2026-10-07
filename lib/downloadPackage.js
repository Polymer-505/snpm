import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import { getDownloadLink } from "./getPackageLink.js";
import { getArchiveName } from "./getArchiveName.js";

export async function downloadPackage(packageName) {
  const { link, version } = await getDownloadLink(packageName);
  const response = await fetch(link);
  if (!response.ok) {
    console.log(response.status);
  }

  await pipeline(
    response.body,
    fs.createWriteStream(getArchiveName(packageName, version)),
  );
}
