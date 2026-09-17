/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

let basePath = ''
let assetPrefix = ''

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  basePath = `/${repo}`
  assetPrefix = `/${repo}/`
}

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix,
}

module.exports = nextConfig
