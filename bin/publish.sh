#!/bin/bash
set -e

PAGES_DIR=./gh-pages
REPO="git@github.com:contentful/product-catalogue-js.git"

echo "Publishing"

# get the gh-pages branch of the repo
if [ ! -d $PAGES_DIR ] ; then
  git clone --single-branch --branch gh-pages $REPO $PAGES_DIR
fi

cp -r *.svg *.css *.js pages $PAGES_DIR

# Setup base path and analytics tag
cat index.html | \
  ./bin/setup_analytics | \
  sed -e 's/<base href="\/"/<base href="\/product-catalogue-js\/"/g' > \
  $PAGES_DIR/index.html

cp $PAGES_DIR/index.html $PAGES_DIR/404.html

pushd $PAGES_DIR
git add .
git commit -a -m "Page update"
if [ $? -eq 1 ] ; then
  echo "Nothing to update"
else
  git push origin gh-pages
fi
popd
