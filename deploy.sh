#!/bin/bash
echo "Starting deployment"
# Travis provided vars : GIT_NAME GIT_EMAIL GH_TOKEN
TEMP_DIRECTORY="/tmp/aptly-web-ui"
DIR=$(pwd)
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS="${ORIGIN_URL/github.com/$GH_TOKEN@github.com}"

FILES=(
  'index.html'
  'dist'
  'vendor'
)

echo "Compiling new static content"
mkdir $TEMP_DIRECTORY || exit 1
npm run webpack || exit 1
for file in ${FILES[@]}; do cp -r "${file}" $TEMP_DIRECTORY||exit 1; done

git checkout -B gh-pages || exit 1
echo "Removing old static content"
rm -rf ./* .gitignore
echo "copying new content"
cd $TEMP_DIRECTORY && tar -zcf $DIR/aptly-web-ui.tar.gz * && cd $DIR ||exit 1

echo "Pushing new content to $ORIGIN_URL"
git config user.name "$GIT_NAME" || exit 1
git config user.email "$GIT_EMAIL" || exit 1
git add aptly-web-ui.tar.gz || exit 1
git commit -m "Rebuild for $CURRENT_COMMIT ($(date +"%a %d %b %Y %R"))" || exit 1
echo "push url : ${ORIGIN_URL}"
git push --force --quiet "$ORIGIN_URL_WITH_CREDENTIALS" master ||exit 1

echo "Cleaning up temp files"
rm -Rf $TEMP_DIRECTORY
echo "Deployed successfully."
exit 0
