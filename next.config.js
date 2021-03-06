require('dotenv').config()

const VERCEL_BRANCH = process.env.VERCEL_GITHUB_COMMIT_REF;
const SYSTEM_BRANCH = require("child_process")
  .execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();
const BRANCH = VERCEL_BRANCH ? VERCEL_BRANCH : SYSTEM_BRANCH;

module.exports = {
  env: {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: BRANCH ? BRANCH : process.env.BASE_BRANCH,
    USE_REMOTE: false
  },
  webpack: (config, options) => {
    config.node = {
      fs: 'empty'
    }

    return config;
  }
}
