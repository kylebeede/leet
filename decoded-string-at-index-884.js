/*

An encoded string S is given.  To find and write the decoded string to a tape, the encoded string is read one character at a time and the following steps are taken:

If the character read is a letter, that letter is written onto the tape.
If the character read is a digit (say d), the entire current tape is repeatedly written d-1 more times in total.
Now for some encoded string S, and an index K, find and return the K-th letter (1 indexed) in the decoded string.

NOTE:
1.	2 <= S.length <= 100
2.	S will only contain lowercase letters and digits 2 through 9.
3.	S starts with a letter.
4.	1 <= K <= 10^9
5.	The decoded string is guaranteed to have less than 2^63 letters.

*/

/*
SOLUTION:
If we have a decoded string like appleappleappleappleappleapple and an index like K = 24, the answer is the same if K = 4.

In general, when a decoded string is equal to some word with size length repeated some number of times (such as apple with size = 5 repeated 6 times), the answer is the same for the index K as it is for the index K % size.

We can use this insight by working backwards, keeping track of the size of the decoded string. Whenever the decoded string would equal some word repeated d times, we can reduce K to K % (word.length).

Algorithm

First, find the length of the decoded string. After, we'll work backwards, keeping track of size: the length of the decoded string after parsing symbols S[0], S[1], ..., S[i].

If we see a digit S[i], it means the size of the decoded string after parsing S[0], S[1], ..., S[i-1] will be size / Integer(S[i]). Otherwise, it will be size - 1.
*/

/*
	* @param {string} S
	* @param {number} K
	* @return {string}
*/
const decodeAtIndex = (S, K) => {
	const N = S.length;

	// Find size = length of decoded string
	let size = 0;
	for (let i = 0; i < N; i++) {
		if (isDigit(S[i]))
			size *= S[i] - '0';
		else
			size++;
	}

	for (let i = N - 1; i >= 0; i--) {
		K = Math.round(((K * 100) % (size * 100)) / 100);

		if (K === 0 && !isDigit(S[i]))
			return S[i];

		if (isDigit(S[i]))
			size /= S[i];
		else
			size--;
	}
}

const isDigit = (char) => {
	return char >= '0' && char <= '9';
}

const testString = 'jb8dis8msunncn92o7o45iq7jrkkmx8q24vesm6i4jdtweq6gxccrb7p2fhxsqke7njwcul4y9cd3rpmrhq3ve6prifmt7aa89tt';
const testIndex = 731963130;

const result = decodeAtIndex(testString, testIndex);
console.log(result);
