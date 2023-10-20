export type FrameState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export const insertionSort = (
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

	for (let p_idx = 1; p_idx < size; p_idx++) {
		let mover: number = p_idx;

		if (xs[mover - 1] <= xs[mover]) {
			comparisonCount++;
			generateFrameState(
				`Comapring [${mover}] against [${
					mover + 1
				}]`,
				(k) => k === mover - 1 || k === mover,
				() => false,
				() => false,
			);
			generateFrameState(
				`Skipping [${mover}] against [${
					mover + 1
				}]`,
				() => false,
				() => false,
				() => false,
			);
		}

		while (
			mover > 0 &&
			xs[mover - 1] > xs[mover]
		) {
			comparisonCount++;
			generateFrameState(
				`Comapring [${mover}] against [${
					mover + 1
				}]`,
				(k) => k === mover - 1 || k === mover,
				() => false,
				() => false,
			);
			generateFrameState(
				`Swapping [${mover}] with [${mover + 1}]`,
				() => false,
				(k) => k === mover - 1 || k === mover,
				() => false,
			);

			const temp: number = xs[mover];
			xs[mover] = xs[mover - 1];
			xs[mover - 1] = temp;
			swapCount++;
			generateFrameState(
				`Swapped [${mover}] with [${mover + 1}]`,
				() => false,
				() => false,
				(k) => k === mover - 1 || k === mover,
			);

			mover--;
		}
	}
	generateFrameState(
		`Sorted input in ascending order.`,
		() => false,
		() => false,
		() => false,
	);
};
