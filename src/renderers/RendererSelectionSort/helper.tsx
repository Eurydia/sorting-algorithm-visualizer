type ElementState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export type FrameState = {
	elementStates: ElementState[];
	swapCount: number;
	comparisonCount: number;
	frameDescription: string;
	pivotIndex: number;
	workingRegionFirstIndex: number;
};

export const selectionSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		pivotIndex: number,
		workingRegionFirstIndex: number,
		isCompared: (k: number) => boolean,
		isBeingSwapped: (k: number) => boolean,
		isSwapped: (k: number) => boolean,
	): void => {
		const elementStates: ElementState[] = [];
		for (let i = 0; i < xs.length; i++) {
			elementStates[i] = {
				value: xs[i],
				isBeingCompared: isCompared(i),
				isBeingSwapped: isBeingSwapped(i),
				isSwapped: isSwapped(i),
			};
		}

		frameStates.push({
			frameDescription,
			swapCount,
			comparisonCount,
			elementStates,
			workingRegionFirstIndex,
			pivotIndex,
		});
	};

	generateFrameState(
		"Unsorted input.",
		-1,
		-1,
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
			`[${offset}] is the first element of the unsorted region.`,
			-1,
			offset,
			() => false,
			() => false,
			() => false,
		);

		let pivotIndex: number = offset;

		generateFrameState(
			`Consider [${pivotIndex}] as pivot.`,
			pivotIndex,
			offset,
			() => false,
			() => false,
			() => false,
		);

		for (let i = offset; i < size; i++) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${pivotIndex}] against [${i}].`,
				pivotIndex,
				offset,
				(k) => k === pivotIndex || k === i,
				() => false,
				() => false,
			);

			if (xs[pivotIndex] > xs[i]) {
				generateFrameState(
					`[${pivotIndex}] is larger than [${i}]. [${i}] is the new pivot.`,
					pivotIndex,
					offset,
					() => false,
					() => false,
					() => false,
				);
				pivotIndex = i;
			} else {
				generateFrameState(
					`[${pivotIndex}] is not larger than [${i}]. Do not change pivot.`,
					pivotIndex,
					offset,
					() => false,
					() => false,
					() => false,
				);
			}
		}

		generateFrameState(
			`Swapping [${pivotIndex}] (pivot) and [${offset}] (first element of unsorted region).`,
			pivotIndex,
			offset,
			() => false,
			(k) => k === pivotIndex || k === offset,
			() => false,
		);
		const temp: number = xs[offset];
		xs[offset] = xs[pivotIndex];
		xs[pivotIndex] = temp;

		swapCount++;
		generateFrameState(
			`Swapped [${pivotIndex}] against [${offset}].`,
			pivotIndex,
			offset,
			() => false,
			() => false,
			(k) => k === pivotIndex || k === offset,
		);
	}

	generateFrameState(
		`Sorted input in ascending order.`,
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);
};
