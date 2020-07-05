#!/usr/bin/env bash

# Setting yarn production to false will have it install devDependencies but keep NODE_ENV to production
# We need these so webpack is downloaded to run the build
yarn --cwd apps/pinyin install --production=false
yarn --cwd apps/pinyin build
