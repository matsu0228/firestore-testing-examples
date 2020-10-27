import * as admin from "firebase-admin";

export const makeTestProjectID = (prefix = "test") => {
  const strong = 1000;
  return `${prefix}${
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  }`;
};

export const adminAppWithEmulator = (
  projectId: string,
  emulatorHost: string
) => {
  process.env.GCLOUD_PROJECT = projectId;
  process.env.FIRESTORE_EMULATOR_HOST = emulatorHost;
  return admin.initializeApp({
    projectId,
  });
};
