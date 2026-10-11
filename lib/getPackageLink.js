const API_URL = "https://registry.npmjs.org";

function cleanDependencies(packageDependencies) {
  const result = {};

  for (const [name, range] of Object.entries(packageDependencies)) {
    if (!range.startsWith("^")) {
      console.error(
        `Unsupported version range ${range} for dependency ${name}. ` +
          `snpm currently supports only ranges starting with ^ (for example, ^1.2.3).`,
      );
      process.exit(1);
    }
    const cleanedVersion = range.slice(1);

    result[name] = cleanedVersion;
  }

  return result;
}

export async function getDownloadLink(packageName, version) {
  try {
    const response = await fetch(`${API_URL}/${packageName}`);
    if (!response.ok) {
      console.error(`Failed (${response.status})`);
      process.exit(1);
    }
    const data = await response.json();
    const targetVersion = version || data["dist-tags"].latest;

    const downloadLink = data.versions[targetVersion].dist.tarball;
    const packageDependencies = data.versions[targetVersion].dependencies || {};

    const cleaned = cleanDependencies(packageDependencies);

    return {
      link: downloadLink,
      version: targetVersion,
      dependencies: cleaned,
    };
  } catch (error) {
    console.error(error);
  }
}
