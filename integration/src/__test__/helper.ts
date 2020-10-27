import { execSync } from "child_process";

const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST;

export const makeProjectID = (prefix = "test") => {
  const hrTime = process.hrtime();
  return `${prefix}-${(hrTime[0] * 1000000 + hrTime[1] / 1000) * 1000}`;
};

export const importToEmulator = async (
  fsPath: string,
  collectionPath: string,
  projectId: string
): Promise<void> => {
  const restoreCmd = `FIRESTORE_EMULATOR_HOST=${emulatorHost} fsrpl restore --path "${fsPath}" "${collectionPath}/*" --debug --emulators-project-id=${projectId}`;
  console.log(`restore: ${restoreCmd}`);
  const stdout = await execSync(`${restoreCmd}`);
  console.log(`imported test data: ${stdout.toString()}`);
};
