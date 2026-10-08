#!/usr/bin/env node

import { commandHelp } from "../lib/commands/help.js";
import { commandInstall } from "../lib/commands/install.js";
import { commandInit } from "../lib/commands/init.js";

const [command, packageName] = process.argv.slice(2);

switch (command) {
  case "help":
    commandHelp();
    break;
  case "install":
    commandInstall(packageName);
    break;
  case "init":
    commandInit();
    break;
  default:
    commandHelp();
}
