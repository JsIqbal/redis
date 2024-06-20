// Sessions
export const sessionKey = (sessionId) => `sessions#${sessionId}`;

// Cache
export const pageCacheKey = (route) => `pagecache#${route}`;

// Users
export const usersKey = (userId) => `users#${userId}`;
export const usernamesKey = () => 'usernames';
export const usernamesUniqueKey = () => 'usernames:unique';
export const usersItemsKey = (userId) => `users:items#${userId}`;
export const usersBidsKey = (userId) => `users:bids#${userId}`;
export const usersLikesKey = (userId) => `users:likes#${userId}`;

// Items
export const itemsKey = (itemId) => `items#${itemId}`;
export const bidHistoryKey = (itemId) => `history#${itemId}`;
export const itemsByBidsKey = () => 'items:bids';
export const itemsByViewsKey = () => 'items:views';
export const itemsByPriceKey = () => 'items:price';
export const itemsByEndingAtKey = () => 'items:endingAt';
export const itemsViewsKey = (itemId) => `items:views#${itemId}`;
export const itemsIndexKey = () => 'idx:items';
