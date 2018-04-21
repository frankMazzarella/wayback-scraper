const request = require('request');
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');

const logger = log4js.getLogger('download service');
logger.level = 'info';
const outputDir = path.join(__dirname, '../', 'dist');

makeOutputDir(outputDir);
isOutputEmpty(outputDir);

function makeOutputDir(dir) {
  if (!fs.existsSync(dir)) {
    logger.info(`creating output directory: ${dir}`);
    fs.mkdirSync(dir);
  }
}

function isOutputEmpty(dir) {
  fs.readdir(dir, function(error, files) {
    if (error) {
      logger.error(`error reading output directory: ${dir} with error: ${error}`);
    }

    if (files.length) {
      logger.error(`please empty or delete ${dir} and try again`);
      process.exit(0);
    }
  });
}

module.exports.download = (url, filename) => {
  return new Promise((resolve, reject) => {
    request(url)
      .on('end', () => {
        resolve();
      })
      .on('error', function(error) {
        logger.error(`error downloading ${filename}: ${error}`);
        reject(error);
      })
      .pipe(fs.createWriteStream(path.join(outputDir, filename)));
  });
}
