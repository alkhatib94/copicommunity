// next.config.mjs
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default createMDX()(config);
