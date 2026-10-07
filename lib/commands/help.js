import pkg from "../../package.json" with { type: "json" };

// Open help
export function commandHelp() {
  console.log("snpm <command>");
  console.log(`Version: ${pkg.version}`);
  console.log("");
  console.log("Usage:");
  console.log("");
  console.log("snpm install <package>     install package");
  console.log("");
  console.log("Available commands: install, help");
  process.exit(0);
}
