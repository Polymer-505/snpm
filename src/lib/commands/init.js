import fs from "node:fs";
import path from "node:path";

export function commandInit() {
  const name = path.basename(process.cwd()).toLowerCase().replaceAll(" ", "-");

  const packageJson = `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo Error: no test specified && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}`;

  if (fs.existsSync("package.json")) {
    console.log("package.json already exists.");
    process.exit(1);
  }

  fs.writeFileSync("package.json", packageJson);
}
