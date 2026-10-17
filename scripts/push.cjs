const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const readline = require('readline');

async function main() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN;
  if (!token) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Enter your GitHub Personal Access Token (PAT): ', async (pat) => {
      rl.close();
      await doPush(pat.trim());
    });
  } else {
    await doPush(token.trim());
  }
}

async function doPush(token) {
  if (!token) {
    console.error('Error: Token is required to authenticate push to GitHub.');
    process.exit(1);
  }
  console.log('Connecting to https://github.com/navadeepjustin-create/portfolio.git ...');
  const repoDir = require('path').resolve(__dirname, '..');
  try {
    const pushResult = await git.push({
      fs,
      http,
      dir: repoDir,
      remote: 'origin',
      ref: 'main',
      onAuth: () => ({ username: token })
    });
    console.log('Push complete!', pushResult);
    console.log('Repository URL: https://github.com/navadeepjustin-create/portfolio');
  } catch (err) {
    console.error('Push error:', err.message);
    if (err.data) console.error(err.data);
    process.exit(1);
  }
}

main();
