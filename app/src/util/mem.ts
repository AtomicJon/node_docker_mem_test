import { formatBytes } from './format';

export const getMemUsage = (log = true) => {
  const memUsage = process.memoryUsage();
  const details = {
    image: process.env.IMAGE,
    rss: formatBytes(memUsage.rss),
    rssDiff: formatBytes(memUsage.rss - memUsage.heapTotal),
    mem: {
      rss: formatBytes(memUsage.rss),
      heapTotal: formatBytes(memUsage.heapTotal),
      heapUsed: formatBytes(memUsage.heapUsed),
      external: formatBytes(memUsage.external),
      arrayBuffers: formatBytes(memUsage.arrayBuffers),
    },
  };

  if (log) {
    console.log(details);
  }

  return details;
};
