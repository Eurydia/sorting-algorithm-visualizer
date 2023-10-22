type ElementState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export type FrameState = {
	elementState: ElementState[];
	swapCount: number;
	comparisonCount: number;
	frameDescription: string;
	workingRegionFirstIndex: number;
	workingRegionLastIndex: number;
};

export const mergeSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
) => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		workingRegionFirstIndex: number,
		workingRegionLastIndex: number,
		isCompared: (k: number) => boolean,
		isBeingSwapped: (k: number) => boolean,
		isSwapped: (k: number) => boolean,
	): void => {
		const elementState: ElementState[] = [];
		for (let i = 0; i < xs.length; i++) {
			elementState[i] = {
				value: xs[i],
				isBeingCompared: isCompared(i),
				isBeingSwapped: isBeingSwapped(i),
				isSwapped: isSwapped(i),
			};
		}

		const currFrameState: FrameState = {
			elementState,
			swapCount,
			comparisonCount,
			frameDescription,
			workingRegionFirstIndex,
			workingRegionLastIndex,
		};

		frameStates.push(currFrameState);
	};

	const __top_down_merge_sort = (
		startIndex: number,
		endIndex: number,
	): void => {
		generateFrameState(
			`Consider elements between [${startIndex}] and [${endIndex}] (inclusive).`,
			startIndex,
			endIndex,
			() => false,
			() => false,
			() => false,
		);

		if (endIndex - startIndex === 0) {
			generateFrameState(
				`Segment has one element. Skipping.`,
				startIndex,
				endIndex,
				() => false,
				() => false,
				() => false,
			);

			return;
		}

		const middleIndex: number = Math.floor(
			(startIndex + endIndex) / 2,
		);

		__top_down_merge_sort(
			startIndex,
			middleIndex,
		);

		__top_down_merge_sort(
			middleIndex + 1,
			endIndex,
		);

		generateFrameState(
			`Merging left segment (between [${startIndex}] and [${middleIndex}]) and right segment (between [${
				middleIndex + 1
			}] and [${endIndex}]).`,
			startIndex,
			endIndex,
			() => false,
			() => false,
			() => false,
		);

		let l_ptr: number = startIndex;
		let r_ptr: number = middleIndex + 1;
		const aux: number[] = [];

		while (
			l_ptr <= middleIndex &&
			r_ptr <= endIndex
		) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${l_ptr}] against [${r_ptr}].`,
				startIndex,
				endIndex,
				(k) => k === r_ptr || k === l_ptr,
				() => false,
				() => false,
			);
			if (xs[l_ptr] > xs[r_ptr]) {
				aux.push(xs[r_ptr]);
				r_ptr++;
				continue;
			}
			aux.push(xs[l_ptr]);
			l_ptr++;
		}

		while (l_ptr <= middleIndex) {
			aux.push(xs[l_ptr]);
			l_ptr++;
		}

		while (r_ptr <= endIndex) {
			aux.push(xs[r_ptr]);
			r_ptr++;
		}

		for (let i = 0; i < aux.length; i++) {
			generateFrameState(
				`Swapping [${
					i + startIndex
				}] from auxiliary memory.`,
				startIndex,
				endIndex,
				() => false,
				(k) => k === i + startIndex,
				() => false,
			);

			xs[i + startIndex] = aux[i];
			swapCount++;
			generateFrameState(
				`Swapped [${
					i + startIndex
				}] from auxiliary memory.`,
				startIndex,
				endIndex,
				() => false,
				() => false,
				(k) => k === i + startIndex,
			);
		}
	};

	generateFrameState(
		"Unsorted input.",
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);

	__top_down_merge_sort(0, size - 1);

	generateFrameState(
		"Sorted input in ascening order.",
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);
};
