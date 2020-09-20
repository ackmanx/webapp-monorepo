#!/usr/bin/env bash

# Pushing to Heroku git remote will trigger a build and their dyno will automatically run yarn script `heroku-postbuild`
# That will run this file, which will build the FE bundles

# Setting yarn production to false will have it install devDependencies when Heroku builds the app, but keep NODE_ENV to production
# We need these dependencies so webpack is downloaded onto Heroku servers and then it can be used to run the builds
# The alternative is to have _all_ dependencies in "dependencies" but I like to keep them mentally separated

yarn --cwd apps/pinyin build
yarn --cwd apps/how-old-is build
