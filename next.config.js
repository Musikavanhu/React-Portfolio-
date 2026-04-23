/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'output: export' disabled — API routes (ToT solver streaming endpoint) require a Node server.
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Allow Next.js/webpack to transpile ESM-only packages
  transpilePackages: [
    '@shadergradient/react',
    '@react-three/fiber',
    'three',
    'three-stdlib',
    'camera-controls',
  ],

  webpack(config) {
    // Let webpack handle .mjs files from node_modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    return config
  },
}

module.exports = nextConfig
