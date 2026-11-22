const API_URL = "https://registry.npmjs.org";
import semver from "semver";

function resolveVersion(versions, range, packageName) {
  const version = semver.maxSatisfying(versions, range);

  if (!version) {
    throw new Error(
      `No version of ${packageName} satisfies the requested range ${range}`,
    );
  }

  return version;
}

export async function getDownloadLink(packageName, version) {
  const response = await fetch(`${API_URL}/${packageName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${packageName} (${response.status})`);
  }

  const data = await response.json();
  const targetVersion = version
    ? resolveVersion(Object.keys(data.versions), version, packageName)
    : data["dist-tags"].latest;

  const targetPackage = data.versions[targetVersion];
  if (!targetPackage) {
    throw new Error(`Version ${targetVersion} of ${packageName} was not found`);
  }

  return {
    link: targetPackage.dist.tarball,
    version: targetVersion,
    dependencies: targetPackage.dependencies || {},
  };
}
