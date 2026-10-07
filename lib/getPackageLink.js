const API_URL = "https://registry.npmjs.org";

export async function getDownloadLink(packageName) {
  try {
    const response = await fetch(`${API_URL}/${packageName}`);
    if (!response.ok) {
      console.log(`Failed (${response.status})`);
      process.exit(1);
    }
    const data = await response.json();
    const latestVersion = data["dist-tags"].latest;

    const downloadLink = data.versions[latestVersion].dist.tarball;

    return { link: downloadLink, version: latestVersion };
  } catch (error) {
    console.error(error);
  }
}
