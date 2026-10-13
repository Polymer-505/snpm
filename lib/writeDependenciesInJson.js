import fs from "node:fs";

export function writeDependenciesInJson(packageName, version) {
  const rawData = fs.readFileSync("package.json", "utf8");
  const data = JSON.parse(rawData);
  if (!data.dependencies) {
    data.dependencies = {};
  }
  data.dependencies[packageName] = `^${version}`;

  fs.writeFileSync(
    "package.json",
    JSON.stringify(data, null, 2) + "\n",
    "utf8",
  );
}
