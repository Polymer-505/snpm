import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

import { getArchiveName } from "./getArchiveName.js";

export function tarExtractor(packageName, version) {
  const archiveName = getArchiveName(packageName, version);
  const archive = fs.readFileSync(archiveName);
  const tar = zlib.gunzipSync(archive);
  // console.log(
  //   "Archive size:",
  //   archive.length,
  //   "Unpacked TAR size:",
  //   tar.length,
  // );

  // Initialize the byte offset
  let offset = 0;

  // Loop through the TAR archive until the end is reached
  while (offset < tar.length) {
    // 1. Slice the 512-byte header
    const header = tar.subarray(offset, offset + 512);

    // If the header buffer is less than 512 bytes, the file is likely truncated
    if (header.length < 512) {
      break;
    }

    // 2. Read the file name (first 100 bytes)
    const nameBytes = header.subarray(0, 100);
    const end = nameBytes.indexOf(0);
    // If null byte is not found, read all 100 bytes; otherwise, read up to the null byte
    const name = nameBytes.toString("utf8", 0, end === -1 ? 100 : end).trim();

    // 3. If the name is empty, we reached the trailing empty blocks. Exit the loop.
    if (!name) {
      // console.log("End of archive reached (empty block).");
      break;
    }

    // 4. Read the file size (12 bytes starting at offset 124)
    const sizeText = header.toString("utf8", 124, 136);
    const size = parseInt(sizeText, 8);

    const relativeName = name.slice("package/".length);
    // console.log(`File: ${relativeName} | Size: ${size} bytes`);

    if (relativeName) {
      const data = tar.subarray(offset + 512, offset + 512 + size);
      const target = path.join("node_modules", packageName, relativeName);

      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, data);
    }

    // 6. Calculate the position of the next header, accounting for 512-byte data block alignment
    const next = offset + 512 + Math.ceil(size / 512) * 512;

    // Move the offset to the next header position
    offset = next;
  }
}
