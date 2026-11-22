import fs from "node:fs";
export function commandRemove(packageName) {
  if (!packageName) {
    console.error("Package name not specified");
    process.exit(1);
  }

  if (!fs.existsSync("package.json")) {
    console.error("package.json not found");
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const listed = Object.hasOwn(packageJson.dependencies ?? {}, packageName);

  fs.rmSync(`node_modules/${packageName}`, { recursive: true, force: true });

  if (listed) {
    delete packageJson.dependencies[packageName];
    fs.writeFileSync(
      "package.json",
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );
  }

  console.log(`${packageName} has been successfully removed`);
}
