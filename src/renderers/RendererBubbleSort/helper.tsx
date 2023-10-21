export type ElementState = {
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
		workingRegionLastIndex: number,
		frameDescription: string,
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
		-2,
		"Unsorted input.",
		() => false,
		() => false,
		() => false,
	);

	generateFrameState(
		size - 1,
		`Set size of working region to ${size} (current: [0] to [${
			size - 1
		}]).`,
		() => false,
		() => false,
		() => false,
	);

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		for (let k = 0; k < size - offset - 1; k++) {
			comparisonCount++;

			generateFrameState(
				size - offset - 1,
				`Comparing [${k}] against [${k + 1}].`,
				(x) => x === k || x === k + 1,
				() => false,
				() => false,
			);

			const a = xs[k];
			const b = xs[k + 1];

			if (b >= a) {
				generateFrameState(
					size - offset - 1,
					`[${k}] is smaller than [${
						k + 1
					}]. Do not swap [${k}] and [${k + 1}].`,
					(x) => x === k || x === k + 1,
					() => false,
					() => false,
				);
				continue;
			}

			generateFrameState(
				size - offset - 1,
				`[${k}] is larger than [${
					k + 1
				}]. Swapping [${k}] and [${k + 1}].`,
				() => false,
				(x) => x === k || x === k + 1,
				() => false,
			);

			xs[k] = b;
			xs[k + 1] = a;
			swapCount++;

			generateFrameState(
				size - offset - 1,
				`Swapped [${k}] and [${k + 1}].`,
				() => false,
				() => false,
				(x) => x === k || x === k + 1,
			);
		}

		generateFrameState(
			size - offset - 2,
			`Decreased size of working region by one (current: [0] to [${
				size - offset - 2
			}]).`,
			() => false,
			() => false,
			() => false,
		);
	}

	generateFrameState(
		0,
		`Size of working region is one. Sorting complete.`,
		() => false,
		() => false,
		() => false,
	);

	generateFrameState(
		-1,
		`Sorted input in ascending order.`,
		() => false,
		() => false,
		() => false,
	);
};
