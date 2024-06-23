export const pageCacheKey = (route: string): string => `pagecache#${route}`;

export const usersKey = (userId: string): string => `users#${userId}`;

export const sessionsKey = (sessionId: string): string =>
    `sessions#${sessionId}`;
