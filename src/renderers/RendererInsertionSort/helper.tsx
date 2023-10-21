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
	pivotIndex: number;
};

export const insertionSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		pivotIndex: number,
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
		const currFrameState: FrameState = {
			swapCount,
			comparisonCount,
			elementStates,
			frameDescription,
			pivotIndex,
		};
		frameStates.push(currFrameState);
	};

	generateFrameState(
		"Unsorted input.",
		-1,
		() => false,
		() => false,
		() => false,
	);

	for (
		let pivotIndex = 0;
		pivotIndex < size;
		pivotIndex++
	) {
		generateFrameState(
			`Set [${pivotIndex}] as pivot.`,
			pivotIndex,
			() => false,
			() => false,
			() => false,
		);

		let mover: number = pivotIndex;
		while (
			mover > 0 &&
			xs[mover - 1] > xs[mover]
		) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${mover}] against [${
					mover - 1
				}].`,
				mover,
				(k) => k === mover - 1 || k === mover,
				() => false,
				() => false,
			);
			generateFrameState(
				`[${mover}] is smaller than [${
					mover - 1
				}]. Swapping.`,
				mover,
				() => false,
				(k) => k === mover - 1 || k === mover,
				() => false,
			);

			const temp: number = xs[mover];
			xs[mover] = xs[mover - 1];
			xs[mover - 1] = temp;

			swapCount++;
			generateFrameState(
				`Swapped [${mover}] and [${mover - 1}].`,
				mover,
				() => false,
				() => false,
				(k) => k === mover - 1 || k === mover,
			);
			mover--;
		}

		if (mover === 0) {
			generateFrameState(
				`Pivot is the first element. Skipping to next pivot.`,
				0,
				() => false,
				() => false,
				() => false,
			);
			continue;
		}

		comparisonCount++;
		generateFrameState(
			`Comparing [${mover}] against [${
				mover - 1
			}].`,
			mover,
			(k) => k === mover - 1 || k === mover,
			() => false,
			() => false,
		);
		generateFrameState(
			`[${mover}] is not smaller than [${
				mover - 1
			}]. Do not swap. Skip to next pivot.`,
			mover,
			(k) => k === mover - 1 || k === mover,
			() => false,
			() => false,
		);
	}

	generateFrameState(
		`No more pivot to consider. Sorting complete`,
		-1,
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
