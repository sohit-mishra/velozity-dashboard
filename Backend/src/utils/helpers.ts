export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const getPagination = (
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit
  };
};

export const asyncHandler =
  (fn: Function) =>
  (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const generateRandomString = (length = 32) => {
  return Math.random().toString(36).substring(2, length + 2);
};