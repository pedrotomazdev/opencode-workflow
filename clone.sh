#!/bin/bash

# vars
gitServer=/w/layout/
storeID=$1
newStoreRepo=$gitServer$storeID'.git'
devArea=$(pwd)

cd $gitServer

# creates the repo (only if doesn't exist)
if [ ! -d "$newStoreRepo" ]; then
    mkdir $storeID'.git'
    cd $newStoreRepo
    git init --bare
fi

cd $devArea

# clone the repo (only if doesn't exist in dev)
if [ ! -d "$storeID" ]; then
    git clone --recursive $newStoreRepo $storeID
else
    cd $storeID
    git pull origin master
fi