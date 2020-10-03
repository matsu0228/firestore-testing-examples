#!/usr/bin/env bash
set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CWD="$(pwd)"

echo "Running in ${CWD}"
echo "Running with node: $(which node)"
echo "Running with npm: $(which npm)"

echo "Ensuring CLI tools..."
npm list -g firebase-tools || npm install --global firebase-tools@${FIREBASE_TOOLS_VERSION:-7.12.1}
go get github.com/ka2n/waitport/cmd/waitport/...
echo "Ensured CLI tools:"
echo -e "\t$(which firebase)"
echo -e "\t$(which waitport)"

export FIRESTORE_EMULATOR_HOST=localhost:58080

firebase emulators:start --only firestore &
PID="$!"
# emulatorが起動するのを待つ
waitport -listen $FIRESTORE_EMULATOR_HOST -timeout 2m