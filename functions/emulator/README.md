## CIでfirestore emulatorを用いたテスト

### ローカル環境

下記のように事前にfirestore emulatorを起動しておくことでローカルでtestができる
 
```
$ firebase emulators:start --only firestore
$ cd functions && npx jest --env node ./src/libs/__tests__/*some*.test.ts
```

### GitHub Actions

下記のようにすることで、ci内でfirestore emulatorを起動してtestができるようにしている

[workflow sample](/.github/workflows/tests-for-functions.yml#L29-L52)
