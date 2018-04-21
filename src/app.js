const log4js = require('log4js');
const { download } = require('./download.service');

const logger = log4js.getLogger('app');
logger.level = 'info';

let currentlyDownloadingIdx = 0;
const addressList = [
  'https://web.archive.org/web/20160509172647if_/http://radio.lazy-rich.com/show/Lazy%20Rich%20-%20The%20Lazy%20Rich%20Show%20061%20(15%20January%202015)%20feat.%20Freakhouze.mp3',
  'https://web.archive.org/web/20160507233855if_/http://radio.lazy-rich.com/show/Lazy%20Rich%20-%20The%20Lazy%20Rich%20Show%20001%20(21%20January%202010)%20feat.%20Keemerah.mp3',
  'https://web.archive.org/web/20160509111540if_/http://radio.lazy-rich.com/show/Lazy%20Rich%20-%20The%20Lazy%20Rich%20Show%20069%20(17%20September%202015)%20The%20Last%20One.mp3',
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
  download(address, filename)
    .then(() => {
      logger.info(`sucessfully downloaded ${filename}`);
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