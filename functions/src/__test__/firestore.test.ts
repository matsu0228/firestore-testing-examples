import { Firestore } from "../firestore";
import * as helper from "./helper";
import { execSync } from "child_process";

describe("firestore", () => {
  let projectId;
  projectId = helper.makeTestProjectID();
  const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
  const admin = helper.adminApp(projectId);
  const db = new Firestore(admin);

  beforeAll(async () => {
    const restoreCmd = `FIRESTORE_EMULATOR_HOST=${emulatorHost} fsrpl restore --path "./src/__test__/data" "products/*" --debug --emulators-project-id=${projectId}`;
    const stdout = await execSync(`${restoreCmd}`);
    console.log(`imported test data: ${stdout.toString()} with ${projectId}`);
  });
  afterAll(async () => {
    helper.clearFirestoreData(projectId);
    await helper.cleanup();
    console.log("cleared test data: ", projectId);
  });

  console.log(`create db with ${projectId}`);
  test("succeed to import of test data", async () => {
    expect.assertions(1);
    const gotDocIds = await admin
      .firestore()
      .collection("products")
      .get()
      .then((qs) => qs.docs.map((doc) => doc.id));
    console.log("got documents id: ", gotDocIds);
    expect(gotDocIds).toEqual(["ipad", "iphone"]);
  });
  test.each([
    [["iphone", "ipad"], 199600],
    [["iphone"], 79800],
    [["iphone", "invalid product"], 79800],
    [["invalid product"], 0],
  ])(
    "calculatePrices(): sum %p prices to equal %p",
    async (productIds, expected) => {
      expect.assertions(1);
      const actual = await db.calculatePrices(productIds);
      expect(actual).toBe(expected);
    }
  );
});
