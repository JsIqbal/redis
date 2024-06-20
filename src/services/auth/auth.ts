import { randomBytes, scrypt } from 'crypto';
import { createUser, getUserByUsername } from '$services/queries/users';

export const signup = async (username: string, password: string) => {
	const [hashed, salt] = await saltAndHash(password);

	return createUser({
		username,
		password: `${hashed}.${salt}`
	});
};

export const signin = async (username: string, password: string): Promise<string> => {
	const user = await getUserByUsername(username);

	if (!user) {
		throw new Error('Username does not exist');
	}

	const matches = await comparePasswords(password, user.password);

	if (matches) {
		return user.id;
	}

	throw new Error('Invalid password');
};

const comparePasswords = async (password: string, storedPassword: string) => {
	const [hashed, salt] = storedPassword.split('.');

	return new Promise((resolve, reject) => {
		scrypt(password, salt, 32, (err, key) => {
			if (err) {
				reject(err);
			}

			resolve(key.toString('hex') === hashed);
		});
	});
};

const saltAndHash = (password: string): Promise<[string, string]> => {
	const salt = randomBytes(4).toString('hex');

	return new Promise((resolve, reject) => {
		scrypt(password, salt, 32, (err, key) => {
			if (err) {
				reject(err);
			}

			resolve([key.toString('hex'), salt]);
		});
	});
};
