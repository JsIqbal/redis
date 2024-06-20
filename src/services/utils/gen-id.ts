import { randomBytes } from 'crypto';

export const genId = () => {
	return randomBytes(3).toString('hex');
};
