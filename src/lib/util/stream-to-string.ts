export async function streamToString(stream: any) {
	const chunks = [];
	for await (const chunk of stream) {
		chunks.push(Buffer.from(chunk));
	}
	return Buffer.concat(chunks).toString('utf-8');
}
