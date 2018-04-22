const log4js = require('log4js');
const { download } = require('./download.service');

const logger = log4js.getLogger('app');
logger.level = 'info';

let currentlyDownloadingIdx = 0;
const addressList = [
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://www.w3schools.com/html/horse.mp3',
];

logger.info('starting downloads');
startDownloads();

function startDownloads() {
  if (currentlyDownloadingIdx >= addressList.length) {
    logger.info('download complete!! :)');
    process.exit(0);
  }

  const fileNumber = padNumber(currentlyDownloadingIdx + 1);
  const filename = `${fileNumber}_podcast.mp3`;
  const address = addressList[currentlyDownloadingIdx];
  logger.info(`starting download for ${filename}`);
  download(address, filename)
    .then(() => {
      currentlyDownloadingIdx++;
      startDownloads();
    })
    .catch(error => logger.error(error));
}

function padNumber(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

process.on('uncaughtException', (error) => {
  logger.error(`uncaught error: ${error}`);
  process.exit(1);
});