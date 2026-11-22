import fs from "node:fs";

export function writeDependenciesInJson(packageName, version) {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  packageJson.dependencies[packageName] = version;

  fs.writeFileSync(
    "package.json",
    JSON.stringify(packageJson, null, 2) + "\n",
    "utf8",
  );
}
