/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

const config = require('./webpack.config.common.js');

const ngoLoaderRule = {
  loader: '@angular-devkit/build-optimizer/webpack-loader',
  options: {
    sourceMap: true
  }
}

config.module.rules.push({ test: /\.ts$/, use: [ngoLoaderRule, '@ngtools/webpack'] })
config.module.rules.push({ test: /\.js$/, use: [ngoLoaderRule] })
config.plugins.unshift(new PurifyPlugin());

module.exports = config;
