#!/bin/bash

set -e
echo $(git rev-parse --show-toplevel) # to fail if we are in wrong place
cd "$(git rev-parse --show-toplevel)"
rm -rf build/
npm run demo
cp index.html build/
cd build/
git init .
git add .
git commit -m "Update pages"
git push git@github.com:freiksenet/react-calendar.git master:gh-pages --force
rm -rf .git
