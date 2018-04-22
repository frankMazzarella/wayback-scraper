const request = require('request');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../', 'dist');

function makeOutputDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

module.exports.download = (url, filename) => {
  makeOutputDir(outputDir);
  return new Promise((resolve, reject) => {
    request(url)
      .on('end', resolve)
      .on('error', reject)
      .pipe(fs.createWriteStream(path.join(outputDir, filename)));
  });
}
