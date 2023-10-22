type ElementState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export type FrameState = {
	swapCount: number;
	comparisonCount: number;
	elementStates: ElementState[];
	frameDescription: string;
	workingRegionFirstIndex: number;
	workingRegionLastIndex: number;
	pivotIndex: number;
};

export const quickSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
) => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		pivotIndex: number,
		workingRegionFirstIndex: number,
		workingRegionLastIndex: number,
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
			comparisonCount,
			swapCount,
			elementStates,
			pivotIndex,
			workingRegionFirstIndex,
			workingRegionLastIndex,
		});
	};

	const __partition = (
		lowIndex: number,
		highIndex: number,
	): number => {
		const pivot: number = xs[highIndex];

		generateFrameState(
			`Consider elements between [${lowIndex}] and [${highIndex}] inclusive.`,
			-1,
			lowIndex,
			highIndex,
			() => false,
			() => false,
			() => false,
		);

		generateFrameState(
			`Consider [${highIndex}] as pivot.`,
			highIndex,
			lowIndex,
			highIndex,
			() => false,
			() => false,
			() => false,
		);

		let pivotIndex: number = lowIndex - 1;

		for (let i = lowIndex; i < highIndex; i++) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${i}] against [${highIndex}] (pivot).`,
				highIndex,
				lowIndex,
				highIndex,
				(k) => k === i || k === highIndex,
				() => false,
				() => false,
			);

			if (xs[i] <= pivot) {
				pivotIndex++;
				generateFrameState(
					`[${i}] is smaller than [${highIndex}]. Move it to left partition.`,
					highIndex,
					lowIndex,
					highIndex,
					() => false,
					(k) => k === i || k === pivotIndex,
					() => false,
				);

				const temp: number = xs[pivotIndex];
				xs[pivotIndex] = xs[i];
				xs[i] = temp;

				swapCount++;
				generateFrameState(
					`Swapped [${i}] and [${pivotIndex}].`,
					highIndex,
					lowIndex,
					highIndex,
					() => false,
					() => false,
					(k) => k === i || k === pivotIndex,
				);
			} else {
				generateFrameState(
					`[${i}] is greater than [${pivotIndex}]. Leave it as is.`,
					highIndex,
					lowIndex,
					highIndex,
					() => false,
					(k) => k === i || k === pivotIndex,
					() => false,
				);
			}
		}

		pivotIndex++;
		generateFrameState(
			`Swapping [${highIndex}] (pivot) with [${pivotIndex}] (between smaller and larger partitions).`,
			highIndex,
			lowIndex,
			highIndex,
			() => false,
			(k) => k === pivotIndex || k === highIndex,
			() => false,
		);

		const temp: number = xs[pivotIndex];
		xs[pivotIndex] = xs[highIndex];
		xs[highIndex] = temp;

		swapCount++;
		generateFrameState(
			`Swapped [${highIndex}] with [${pivotIndex}].`,
			highIndex,
			lowIndex,
			highIndex,
			() => false,
			() => false,
			(k) => k === pivotIndex || k === highIndex,
		);
		return pivotIndex;
	};

	const __quickSort = (
		lowIndex: number,
		highIndex: number,
	): void => {
		if (lowIndex >= highIndex || lowIndex < 0) {
			return;
		}

		const p: number = __partition(
			lowIndex,
			highIndex,
		);

		__quickSort(lowIndex, p - 1);
		__quickSort(p + 1, highIndex);
	};

	generateFrameState(
		"Unsorted input.",
		-1,
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);

	__quickSort(0, size - 1);

	generateFrameState(
		"Sorted input in ascening order.",
		-1,
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);
};
