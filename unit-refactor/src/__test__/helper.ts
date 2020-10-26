import * as fs from "fs";

export const importTestData = (pathStr: string): { [fn: string]: any } => {
  const json: { [fn: string]: any } = {};
  const dir = `${__dirname}${pathStr}`;
  const paths = fs.readdirSync(dir);
  paths.forEach((fn) => {
    try {
      const buffer = fs.readFileSync(`${dir}/${fn}`, "utf8");
      json[fn.split(".")[0]] = JSON.parse(buffer);
    } catch (error) {
      console.log(`failed to read ${error} with: `, dir, fn);
    }
  });
  return json;
};
