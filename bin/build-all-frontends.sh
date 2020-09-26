#!/usr/bin/env bash

# Pushing to Heroku git remote will trigger a build and their dyno will automatically run yarn script `heroku-postbuild`
# That will run this file, which will build the FE bundles

yarn workspace pinyin build
yarn workspace how-old-is build
