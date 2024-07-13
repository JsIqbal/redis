export const pageCacheKey = (route: string): string => `pagecache#${route}`;
export const usersKey = (userId: string): string => `users#${userId}`;
export const sessionsKey = (sessionId: string): string => `sessions#${sessionId}`;
export const itemsKey = (itemsId: string): string => `items#${itemsId}`;
export const usernamesUniqueKey = (): string => 'usernames:unique';
export const usersLikesKey = (userId: string) => `users:like#${userId}`;