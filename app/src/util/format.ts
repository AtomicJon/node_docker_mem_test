export const formatBytes = (bytes: number, decimals = 2) => {
  return `${(bytes / 1024 / 1024).toFixed(decimals)}MB`;
};
