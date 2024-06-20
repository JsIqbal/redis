import 'dotenv/config';
import { join } from 'path';

const { REDIS_HOST, REDIS_PORT, REDIS_PW } = process.env;

process.argv = [
	process.argv[0],
	process.argv[1],
	'-h',
	REDIS_HOST,
	'-p',
	REDIS_PORT,
	'-a',
	REDIS_PW
];

const dir = new URL('./', import.meta.url);

import(join(dir.pathname, '..', 'node_modules', 'redis-cli', 'lib', 'src', 'index.js'));
