'use strict';

const MAXCHARS = 140;

/**
 * Build an array of tweets
 *
 * @param {String} A big tweet to be converted in many tweets
 * @return {Array} Array of tweets
 */
function tweetstorm(tweet = '') {
  const _tweet = normalize(tweet);
  const words = _tweet.split(' ');
  
  // Only 1 word
  if (words.length === 1) {
    const word = words[0];
    const _ellipsis = ellipsis(word.slice(0, MAXCHARS));
    
    return [word.length > MAXCHARS ? _ellipsis : word];
  }

  // Only 1 tweet
  if (_tweet.length <= MAXCHARS) {
    return [_tweet];
  }

  // Many tweets
  return getTweets(words);
}

/**
 * Generates an array of strings with prefix
 *
 * @param {Array} Array of words to generate the tweets
 * @param {Number} Index to start the counting of tweets
 * @param {Array} Holder of tweets
 * @return {Array} Prefixeds tweets 
 */
function getTweets(words = [], index = 1, tweets = []) {
  let word, nextWord;
  let prefix, tweet;
  let tweetWords = [];

  for (let i in words) {
    i = parseInt(i);

    word = words[i];
    nextWord = words[i + 1] || '';
    tweetWords.push(word);
    
    prefix = `${index}/ `;
    tweet = tweetWords.join(' ');

    // Not ready
    if (nextWord && prefix.length + tweet.length + nextWord.length < MAXCHARS) {
      continue;
    }
    
    // 1 word bigger than MAX
    if (word.length > MAXCHARS) {
      const slicedWord = word.slice(0, MAXCHARS - prefix.length);
      const _ellipsis = ellipsis(slicedWord);
      tweet = `${prefix}${_ellipsis}`;
    } else {
      tweet = `${prefix}${tweet}`;
    }

    // Add tweet to the storm
    tweets.push(tweet);

    // Remove used words
    const leftWords = words.slice(i + 1);

    if (leftWords.length) {
      getTweets(leftWords, ++index, tweets);
      break;
    }
  }

  return tweets;
}

/**
 * Normalize the passed tweet to string
 *
 * @param anything that could be converted in a tweet
 * @return {String}
 */
function normalize(tweet) {
  try {
    return tweet.toString().trim();
  } catch(e) {
    throw Error('Tweet should be a text.');
  }
}

/**
 * Create `...` at final of the string
 *
 * @param {String} String to be converted
 * @return {String} Converted string with `...`
 */
function ellipsis(word = '') {
  const len = word.length;
  const target = len <= 3 ? 0 : len - 3;

  return word.slice(0, target) + '...';
}

module.exports = tweetstorm;