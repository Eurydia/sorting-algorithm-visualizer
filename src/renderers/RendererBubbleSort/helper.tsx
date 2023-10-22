type ElementState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export type FrameState = {
	elementStates: ElementState[];
	frameDescription: string;
	swapCount: number;
	comparisonCount: number;
	workingRegionLastIndex: number;
};

export const bubbleSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		workingRegionLastIndex: number,
		isCompared: (k: number) => boolean,
		isBeingSwapped: (k: number) => boolean,
		isSwapped: (k: number) => boolean,
	): void => {
		const elementStates: ElementState[] = [];
		for (let i = 0; i < xs.length; i++) {
			elementStates.push({
				value: xs[i],
				isBeingCompared: isCompared(i),
				isBeingSwapped: isBeingSwapped(i),
				isSwapped: isSwapped(i),
			});
		}

		const currFrameState: FrameState = {
			swapCount,
			comparisonCount,
			elementStates,
			frameDescription,
			workingRegionLastIndex,
		};
		frameStates.push(currFrameState);
	};

	generateFrameState(
		"Unsorted input.",
		-2,
		() => false,
		() => false,
		() => false,
	);

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		generateFrameState(
			`[${
				size - offset - 1
			}] is the last element of unsorted region.`,
			size - offset - 1,
			() => false,
			() => false,
			() => false,
		);

		for (let k = 0; k < size - offset - 1; k++) {
			comparisonCount++;

			generateFrameState(
				`Comparing [${k}] against [${k + 1}].`,
				size - offset - 1,
				(x) => x === k || x === k + 1,
				() => false,
				() => false,
			);

			const a = xs[k];
			const b = xs[k + 1];

			if (b >= a) {
				generateFrameState(
					`[${k}] is smaller than [${
						k + 1
					}]. Do not swap.`,
					size - offset - 1,
					(x) => x === k || x === k + 1,
					() => false,
					() => false,
				);
				continue;
			}

			generateFrameState(
				`[${k}] is larger than [${
					k + 1
				}]. Swap them.`,
				size - offset - 1,
				() => false,
				(x) => x === k || x === k + 1,
				() => false,
			);

			xs[k] = b;
			xs[k + 1] = a;
			swapCount++;

			generateFrameState(
				`Swapped [${k}] and [${k + 1}].`,
				size - offset - 1,
				() => false,
				() => false,
				(x) => x === k || x === k + 1,
			);
		}
	}

	generateFrameState(
		`Size of working region is one. Sorting complete.`,
		0,
		() => false,
		() => false,
		() => false,
	);

	generateFrameState(
		`Sorted input in ascending order.`,
		-1,
		() => false,
		() => false,
		() => false,
	);
};
