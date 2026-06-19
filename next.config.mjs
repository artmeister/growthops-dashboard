const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'growthops-dashboard';
const basePath = isGitHubPages ? `/${repositoryName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: {
          unoptimized: true
        }
      }
    : {}),
  experimental: {
    cpus: 1,
    workerThreads: false
  }
};

export default nextConfig;
