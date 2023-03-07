/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // put other next-pwa options here
});

const nextConfig = withPWA({
  reactStrictMode: true,
  // put other next js options here
});

const withTM = require("next-transpile-modules")(["three"]);

module.exports = withTM();
module.exports = nextConfig;
