#!/usr/bin/env bash

# Setting yarn production to false will have it install devDependencies when Heroku builds the app, but keep NODE_ENV to production
# We need these dependencies so webpack is downloaded to run the build on the server

yarn --cwd apps/pinyin install --production=false
yarn --cwd apps/pinyin build

yarn --cwd apps/how-old-is install --production=false
yarn --cwd apps/how-old-is build
