import pkg from "../../package.json" with { type: "json" };

// Open help
export function commandHelp() {
  console.log("snpm <command>");
  console.log(`Version: ${pkg.version}`);
  console.log("");
  console.log("Usage:");
  console.log("");
  console.log("snpm install <package>".padEnd(30) + "install package");
  console.log("snpm init".padEnd(30) + "initialized package.json");
  console.log("snpm help".padEnd(30) + "open help");
  console.log("");
  console.log("Available commands: install, init, help");
  process.exit(1);
}
