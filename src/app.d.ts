/// <reference types="@sveltejs/kit" />

declare namespace App {
	type _Session = import('$services/types').Session;

	interface Locals {
		session: _Session;
	}

	interface Platform {}

	interface Session extends _Session {}

	interface Stuff {}
}
