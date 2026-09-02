const ALPHABET =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const BASE = ALPHABET.length;
const LIMIT = 256 - (256 % BASE);
const BUFFER_SIZE = 64;

export function newBase62Id(prefix: string, length: number): string {
	if (!Number.isSafeInteger(length) || length <= 0) {
		throw new RangeError("length must be a positive integer");
	}

	const crypto = window.crypto;

	if (!crypto?.getRandomValues) {
		throw new Error(
			"connectkit: crypto.getRandomValues is not available in this environment",
		);
	}

	const output = new Array<string>(length);
	const buffer = new Uint8Array(BUFFER_SIZE);

	let index = 0;

	while (index < length) {
		crypto.getRandomValues(buffer);

		for (const byte of buffer) {
			if (byte < LIMIT) {
				output[index] = ALPHABET[byte % BASE]!;
				index++;

				if (index === length) {
					break;
				}
			}
		}
	}

	return prefix + output.join("");
}
