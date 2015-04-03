#!/bin/bash

del build dist
webpack
webpack --entry ./demo.js
cp index.html build/
