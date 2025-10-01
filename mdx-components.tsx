import createMDX from '@next/mdx';
const config = {
  reactStrictMode: true,
  experimental: { mdxRs: true },
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
};
export default createMDX()(config);
