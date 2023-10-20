export type FrameState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export const selectionSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[][],
	frameDescs: string[],
	swapCounter: number[],
	comparisonCounter: number[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDesc: string,
		isCompared: (k: number) => boolean,
		isBeingSwapped: (k: number) => boolean,
		isSwapped: (k: number) => boolean,
	): void => {
		swapCounter.push(swapCount);
		comparisonCounter.push(comparisonCount);
		frameDescs.push(frameDesc);
		frameStates.push([]);
		for (let i = 0; i < xs.length; i++) {
			frameStates[frameStates.length - 1][i] = {
				value: xs[i],
				isBeingCompared: isCompared(i),
				isBeingSwapped: isBeingSwapped(i),
				isSwapped: isSwapped(i),
			};
		}
	};

	generateFrameState(
		"Unsorted input.",
		() => false,
		() => false,
		() => false,
	);

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		let pivot: number = offset;
		for (let i = offset + 1; i < size; i++) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${pivot + 1}] against [${
					i + 1
				}].`,
				(k) => k === pivot || k === i,
				() => false,
				() => false,
			);

			if (xs[pivot] > xs[i]) {
				pivot = i;
			}
		}

		generateFrameState(
			`Swapping [${pivot + 1}] against [${
				offset + 1
			}].`,
			() => false,
			(k) => k === pivot || k === offset,
			() => false,
		);
		const temp: number = xs[offset];
		xs[offset] = xs[pivot];
		xs[pivot] = temp;

		swapCount++;
		generateFrameState(
			`Swapped [${pivot + 1}] against [${
				offset + 1
			}].`,
			() => false,
			() => false,
			(k) => k === pivot || k === offset,
		);
	}

	generateFrameState(
		`Sorted input in ascending order.`,
		() => false,
		() => false,
		() => false,
	);
};
