import { getDownloadLink } from "../getPackageLink.js";
import { downloadPackage } from "../downloadPackage.js";
import { extractArchive } from "../extractArchive.js";

export async function commandInstall(packageName) {
  if (!packageName) {
    console.log("Package name not specified");
    process.exit(1);
  }
  const { version } = await getDownloadLink(packageName);
  await downloadPackage(packageName);
  await extractArchive(packageName, version);
}
