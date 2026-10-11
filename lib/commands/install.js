import fs from "node:fs";

import { getDownloadLink } from "../getPackageLink.js";
import { downloadPackage } from "../downloadPackage.js";
import { extractArchive } from "../extractArchive.js";
import { commandInit } from "./init.js";

export async function commandInstall(packageName) {
  try {
    if (!packageName) {
      console.log("Package name not specified");
      process.exit(1);
    }
    if (!fs.existsSync("package.json")) {
      commandInit();
    }
    const { link, version, dependencies } = await getDownloadLink(packageName);
    await downloadPackage(packageName, version, link);
    extractArchive(packageName, version);

    for (const [dependenciesName, dependenciesVersion] of Object.entries(
      dependencies,
    )) {
      const dependenciesInfo = await getDownloadLink(
        dependenciesName,
        dependenciesVersion,
      );
      await downloadPackage(
        dependenciesName,
        dependenciesInfo.version,
        dependenciesInfo.link,
      );
      extractArchive(dependenciesName, dependenciesInfo.version);
    }
    console.log(`${packageName} has been successfuly installed`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
