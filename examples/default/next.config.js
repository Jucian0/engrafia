require('fix-esm').register();
const { engrafia } = require('@engrafia/plugin');
const compose = require('compose-function');
const withImages = require('next-images');

const composed = compose(engrafia, withImages);

module.exports = composed({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
