export type FrameState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export const bubbleSort = (
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

	for (let offset = 0; offset < size; offset++) {
		for (let k = 0; k < size - offset - 1; k++) {
			comparisonCount++;

			generateFrameState(
				`Comparing [${k + 1}] against [${
					k + 2
				}].`,
				(x) => x === k || x === k + 1,
				() => false,
				() => false,
			);

			const a = xs[k];
			const b = xs[k + 1];

			if (b >= a) {
				generateFrameState(
					`Skipping [${k + 1}] and [${k + 2}].`,
					() => false,
					() => false,
					() => false,
				);
				continue;
			}

			generateFrameState(
				`Swapping [${k + 1}] and [${k + 2}].`,
				() => false,
				(x) => x === k || x === k + 1,
				() => false,
			);

			xs[k] = b;
			xs[k + 1] = a;
			swapCount++;

			generateFrameState(
				`Swapped [${k + 1}] and [${k + 2}].`,
				() => false,
				() => false,
				(x) => x === k || x === k + 1,
			);
		}
	}
	generateFrameState(
		`Sorted input in ascending order.`,
		() => false,
		() => false,
		() => false,
	);
};
