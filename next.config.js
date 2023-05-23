/** @type {import('next').NextConfig} */
// @ts-ignore

const withTranspileModules = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: 'YOUR_API_KEY',
    API_VERSION: '2018-03-22',
  },
  amp: {
    canonicalBase: '/',
  },
  assetPrefix: '/',
  // experimental: {
  //   outputFileTracingRoot: '/',
  // },
  i18n: {
    locales: ['en'], // Replace 'en' with the desired locale(s)
    defaultLocale: 'en', // Replace 'en' with the default locale
  },
};

module.exports = withPlugins([
  nextConfig,
  withTranspileModules(['@cloudscape-design/components']),
]);
