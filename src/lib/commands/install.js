import fs from "node:fs";

import { getDownloadLink } from "../getPackageLink.js";
import { downloadPackage } from "../downloadPackage.js";
import { extractArchive } from "../extractArchive.js";
import { writeDependenciesInJson } from "../writeDependenciesInJson.js";
import { commandInit } from "./init.js";

async function installDepenciesTree(
  packageName,
  versionRange,
  installed = new Set(),
) {
  const packageInfo = await getDownloadLink(packageName, versionRange);
  const packageKey = `${packageName}@${packageInfo.version}`;

  if (installed.has(packageKey)) return packageInfo;
  installed.add(packageKey);

  await downloadPackage(packageName, packageInfo.version, packageInfo.link);
  await extractArchive(packageName, packageInfo.version);

  for (const [dependencyName, dependencyRange] of Object.entries(
    packageInfo.dependencies,
  )) {
    await installDepenciesTree(dependencyName, dependencyRange, installed);
  }
  return packageInfo;
}

export async function commandInstall(packageName) {
  try {
    if (!packageName) {
      throw new Error("Package name not specified");
    }
    if (!fs.existsSync("package.json")) {
      commandInit();
    }
    const projectPkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    if (projectPkg.dependencies?.[packageName]) {
      throw new Error(
        `Package ${packageName} is already listed in dependencies`,
      );
    }
    const { version } = await installDepenciesTree(packageName);
    writeDependenciesInJson(packageName, `^${version}`);
    console.log(`${packageName} has been successfuly installed`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
