import type { Client } from './client';

export { Client };

export type TaskMap = Record<string, (...args: any[]) => any>;

export interface Keys {
	groupName: string;
	delayedKey: string;
	activeKey: string;
	failedKey: string;
	completedKey: string;
}

export interface JobSpec {
	messageId: string;
	name: string;
	args: any;
	retries?: number;
	runAt?: number;
}

export interface ErroredJobSpec extends JobSpec {
	err: string;
}

export interface CompletedJobSpec extends JobSpec {
	result: string;
}

export interface WrappedMessage {
	id: string;
	message: {
		[x: string]: string;
	};
}
