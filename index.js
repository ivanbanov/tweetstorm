#!/usr/bin/env node
'use strict';

const text = process.argv[2];
const tweets = require('./src/tweetstorm')(text);

for (let tweet of tweets) {
  console.log(tweet);
}