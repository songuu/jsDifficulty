const atImport = require('postcss-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const postcssPresetEnv = require('postcss-preset-env');
const utilities = require('postcss-utilities');

module.exports = {
    plugins: [postcssPresetEnv, utilities, atImport, precss, autoprefixer, lost]
};
