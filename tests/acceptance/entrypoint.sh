#!/bin/bash

pipenv run lint
ret=$?
if [ $ret -ne 0 ]; then
    echo "Error: linter required to pass"
    #exit 1
fi

./wait-for-http.sh http://apache

pipenv run test