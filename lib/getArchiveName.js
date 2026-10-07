import path from "node:path";

export function getArchiveName(packageName, version) {
  return `${path.basename(packageName)}-${version}.tgz`;
}
