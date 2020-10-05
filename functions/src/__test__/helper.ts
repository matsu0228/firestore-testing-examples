import * as firebase from "@firebase/rules-unit-testing";

export const makeTestProjectID = (prefix = "test") => {
  const strong = 1000;
  return `${prefix}${
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  }`;
};

export const adminApp = (projectID: string) =>
  firebase.initializeAdminApp({
    projectId: projectID,
  });

export const clearFirestoreData = (projectID: string) =>
  firebase.clearFirestoreData({ projectId: projectID });

export const cleanup = () =>
  Promise.all(firebase.apps().map((app) => app.delete()));
