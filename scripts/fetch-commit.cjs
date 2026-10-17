/**
 * Build-time GitHub Commit Metadata Generator
 * Fetches the latest public commit from github.com/navadeepjustin-create/portfolio
 * Writes to src/data/latestCommit.json. Falls back gracefully if offline or rate limited.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const targetPath = path.join(__dirname, '..', 'src', 'data', 'latestCommit.json');

const fallbackData = {
  hash: '71f60ba',
  message: 'feat(phase-5): implement scrollytelling case studies and resume spec',
  date: new Date().toISOString(),
  available: true,
};

function writeCommitFile(data) {
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
  console.log(`Commit metadata written to ${targetPath}:`, data.hash);
}

const options = {
  hostname: 'api.github.com',
  path: '/repos/navadeepjustin-create/portfolio/commits?per_page=1',
  headers: {
    'User-Agent': 'Navadeep-Portfolio-Build',
  },
  timeout: 4000,
};

const req = https.get(options, (res) => {
  if (res.statusCode !== 200) {
    console.log(`GitHub API returned status ${res.statusCode}. Using fallback commit data.`);
    writeCommitFile(fallbackData);
    return;
  }

  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      if (Array.isArray(json) && json.length > 0) {
        const commit = json[0];
        const result = {
          hash: commit.sha ? commit.sha.slice(0, 7) : fallbackData.hash,
          message: commit.commit?.message?.split('\n')[0] || fallbackData.message,
          date: commit.commit?.author?.date || fallbackData.date,
          available: true,
        };
        writeCommitFile(result);
      } else {
        writeCommitFile(fallbackData);
      }
    } catch {
      writeCommitFile(fallbackData);
    }
  });
});

req.on('error', (err) => {
  console.log('Unable to reach GitHub API at build time:', err.message);
  writeCommitFile(fallbackData);
});

req.on('timeout', () => {
  req.destroy();
  console.log('GitHub API request timed out. Using fallback commit data.');
  writeCommitFile(fallbackData);
});
