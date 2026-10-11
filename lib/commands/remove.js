import fs from "node:fs";

export function commandRemove(packageName) {
  if (!fs.existsSync(`node_modules/${packageName}`)) {
    console.log("Package not found");
    process.exit(1);
  }
  fs.rmSync(`node_modules/${packageName}`, { recursive: true, force: true });
  console.log(`${packageName} has been successfuly removed`);
}
