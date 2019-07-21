#!/usr/bin/env bash

if [ $# -eq 0 ]; then
    echo "Missing argument: Which webtask do you want to update?"
    exit 0
fi

#Invoke with `npm run webtask-deploy sheng-ci-entry` for example
#This will copy the file webtask/sheng-ci-entry.js to webtask's servers and update the sheng-ci-entry webtask
wt update $1 "webtask/$1.js"
