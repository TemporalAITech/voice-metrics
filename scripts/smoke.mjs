import { readFileSync } from "node:fs";
console.log("readme len", readFileSync("./README.md","utf8").length);
