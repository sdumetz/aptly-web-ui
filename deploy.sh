#!/bin/bash
echo "Starting deployment"
# Travis provided vars : GIT_NAME GIT_EMAIL GH_TOKEN
BUILD_DIRECTORY="/tmp/tmp_build_dir"
TEMP_DIRECTORY=$BUILD_DIRECTORY/ui
DIR=$(pwd)

FILES=(
  'index.html'
  'dist'
  'vendor'
)

echo "Compiling new static content"
mkdir -p $TEMP_DIRECTORY || exit 1
WEBPACK_OPTS='-p' NODE_ENV='production' npm run webpack || exit 1
for file in ${FILES[@]}; do cp -r "${file}" $TEMP_DIRECTORY||exit 1; done

echo "copying new content"
cd $BUILD_DIRECTORY && tar -zcf $DIR/aptly-web-ui.tar.gz * && cd $DIR ||exit 1

echo "Cleaning up temp files"
rm -Rf $TEMP_DIRECTORY
echo "Deployed successfully."
exit 0
