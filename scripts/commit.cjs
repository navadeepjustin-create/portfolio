const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

async function commitPhase() {
  const message = process.argv.slice(2).join(' ').trim();
  if (!message) {
    console.error('Error: commit message required');
    process.exit(1);
  }
  const dir = path.resolve(__dirname, '..');
  const status = await git.statusMatrix({ fs, dir });
  let count = 0;
  for (const [file, head, workdir, stage] of status) {
    if (workdir === 0) {
      await git.remove({ fs, dir, filepath: file });
      count++;
    } else if (workdir === 2) {
      await git.add({ fs, dir, filepath: file });
      count++;
    }
  }
  if (count === 0) {
    console.log('Nothing to commit, working tree clean');
    return;
  }
  const sha = await git.commit({
    fs,
    dir,
    message,
    author: {
      name: 'Navadeep',
      email: 'navadeepjustin@gmail.com'
    }
  });
  console.log(`Committed successfully [${sha.slice(0, 7)}]: ${message}`);
}

commitPhase().catch(err => {
  console.error('Commit failed:', err);
  process.exit(1);
});
