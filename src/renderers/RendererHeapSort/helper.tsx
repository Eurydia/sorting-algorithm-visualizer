export type FrameState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export const heapSort = (
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

	const __heapsort_rebuild = (
		_size: number,
		parentIndex: number,
	): void => {
		while (parentIndex * 2 + 1 < _size) {
			const leftChildIndex: number =
				parentIndex * 2 + 1;
			let targetChildIndex: number =
				leftChildIndex;

			if (leftChildIndex + 1 < _size) {
				comparisonCount++;
				generateFrameState(
					`Comparing [${
						leftChildIndex + 1
					}] (left child) against [${
						leftChildIndex + 2
					}] (right child)`,
					(k) =>
						k === leftChildIndex ||
						k === leftChildIndex + 1,
					() => false,
					() => false,
				);
				if (
					xs[leftChildIndex] <
					xs[leftChildIndex + 1]
				) {
					targetChildIndex++;
				}
			}

			comparisonCount++;
			generateFrameState(
				`Comparing [${
					parentIndex + 1
				}] (parent) against [${
					targetChildIndex + 1
				}] (child)`,
				(k) =>
					k === parentIndex ||
					k === targetChildIndex,
				() => false,
				() => false,
			);

			if (
				xs[parentIndex] >= xs[targetChildIndex]
			) {
				generateFrameState(
					`Skipping since heap property holds.`,
					(k) =>
						k === parentIndex ||
						k === targetChildIndex,
					() => false,
					() => false,
				);
				return;
			}

			generateFrameState(
				`Swapping [${
					parentIndex + 1
				}] (parent) with [${
					targetChildIndex + 1
				}] (child)`,
				() => false,
				(k) =>
					k === parentIndex ||
					k === targetChildIndex,
				() => false,
			);

			const temp: number = xs[parentIndex];
			xs[parentIndex] = xs[targetChildIndex];
			xs[targetChildIndex] = temp;

			swapCount++;
			generateFrameState(
				`Swapped [${
					parentIndex + 1
				}] (parent) with [${
					targetChildIndex + 1
				}] (child)`,
				() => false,
				() => false,
				(k) =>
					k === parentIndex ||
					k === targetChildIndex,
			);

			parentIndex = targetChildIndex;
		}
	};

	generateFrameState(
		"Unsorted input.",
		() => false,
		() => false,
		() => false,
	);

	for (let i = size - 1; i >= 0; i--) {
		__heapsort_rebuild(size, i);
	}

	for (let i = size - 1; i > 0; i--) {
		generateFrameState(
			`Swapping [${1}]  with [${i + 1}] `,
			() => false,
			(k) => k === 0 || k === i,
			() => false,
		);

		const temp: number = xs[0];
		xs[0] = xs[i];
		xs[i] = temp;

		swapCount++;
		generateFrameState(
			`Swapped [${1}]  with [${i + 1}] `,
			() => false,
			() => false,
			(k) => k === 0 || k === i,
		);

		__heapsort_rebuild(i, 0);
	}

	generateFrameState(
		"Sorted input in ascending order.",
		() => false,
		() => false,
		() => false,
	);
};
