const chai = require('chai');
const expect = chai.expect;
const tweetstorm = require('../src/tweetstorm');

describe('Tweetstorm', () => {
  context('when given an invalid text', () => {
    it('should throw an error', () => {
      expect(() => tweetstorm(text)).to.throw(Error);
    });
  });

  context('when given a tweet with less than 140 chars', () => {
    it('should return an array with 1 tweet', () => {
      const text = ' xxx xxx xxx ';
      const tweet = tweetstorm(text);

      expect(tweet).to.eql(['xxx xxx xxx']);
    });
  });

  context('when given a unique word bigger than 140 chars', () => {
    it('should return an array with a tweet ellipsised', () => {
      const text = Array(150).fill('x').join('');
      const expectedText = Array(137).fill('x').join('');
      const tweet = tweetstorm(text);

      expect(tweet).to.eql([`${expectedText}...`]);
    });
  });

  context('when given a text with more than 140 chars', () => {
    it('should return an array with multiple prefixed tweets', () => {
      let text = '';
      text += 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, molestias beatae.';
      text += ' Delectus corporis beatae ducimus, culpa, alias labore vitae perspiciatis, iure expedita est nemo.';
      text += ' Eius officiis velit hic eligendi, consequuntur.';

      const expectedText = [
        '1/ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, molestias beatae. Delectus corporis beatae ducimus, culpa, alias labore',
        `2/ vitae perspiciatis, iure expedita est nemo. Eius officiis velit hic eligendi, consequuntur.`
      ]

      const tweet = tweetstorm(text);

      expect(tweet).to.eql([
        expectedText[0],
        expectedText[1],
      ]);
    });

    it('should apply ellipsis for words bigger than 140', () => {
      const bigWord = Array(150).fill('x').join('');
      const expectedBigWord = Array(134).fill('x').join('');

      let text = '';
      text += bigWord;
      text += ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime';

      const expectedText = [
        `1/ ${expectedBigWord}...`,
        `2/ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime`,
      ]

      const tweet = tweetstorm(text);

      expect(tweet).to.eql([
        expectedText[0],
        expectedText[1],
      ]);
    });
  });
});