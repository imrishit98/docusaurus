/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const sitemap = require('sitemap');
const loadConfig = require('../load/config');

module.exports = async function createSitemap({
  siteConfig = {},
  routesPaths = [],
}) {
  const {url: siteUrl} = siteConfig;

  if (!siteUrl) {
    throw new Error(
      `Url in ${loadConfig.configFileName} cannot be empty/undefined`,
    );
  }

  const urls = routesPaths.map(routesPath => ({
    url: routesPath,
    changefreq: 'weekly',
    priority: 0.5,
  }));

  const generatedSitemap = sitemap.createSitemap({
    hostname: siteUrl,
    cacheTime: 600 * 1000, // 600 sec - cache purge period
    urls,
  });

  return generatedSitemap.toString();
};
