export type FrameState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export const quickSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[][],
	frameDescs: string[],
	swapCounter: number[],
	comparisonCounter: number[],
) => {
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

	const __partition = (
		lowIndex: number,
		highIndex: number,
	): number => {
		const pivot: number = xs[highIndex];
		let pivotIndex: number = lowIndex - 1;

		for (let i = lowIndex; i < highIndex; i++) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${i}] against [${highIndex}] (pivot).`,
				(k) => k === i || k === highIndex,
				() => false,
				() => false,
			);

			if (xs[i] <= pivot) {
				pivotIndex++;

				generateFrameState(
					`Swapping [${i}] with [${pivotIndex}].`,
					() => false,
					(k) => k === i || k === pivotIndex,
					() => false,
				);

				const temp: number = xs[pivotIndex];
				xs[pivotIndex] = xs[i];
				xs[i] = temp;

				swapCount++;
				generateFrameState(
					`Swapped [${i}] with [${pivotIndex}].`,
					() => false,
					() => false,
					(k) => k === i || k === pivotIndex,
				);
			}
		}

		pivotIndex++;
		generateFrameState(
			`Swapping [${pivot}] with [${highIndex}]`,
			() => false,
			(k) => k === pivotIndex || k === highIndex,
			() => false,
		);

		const temp: number = xs[pivotIndex];
		xs[pivotIndex] = xs[highIndex];
		xs[highIndex] = temp;

		swapCount++;
		generateFrameState(
			`Swapped [${pivot}] with [${highIndex}].`,
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
		() => false,
		() => false,
		() => false,
	);

	__quickSort(0, size - 1);

	generateFrameState(
		"Sorted input in ascening order.",
		() => false,
		() => false,
		() => false,
	);
};
