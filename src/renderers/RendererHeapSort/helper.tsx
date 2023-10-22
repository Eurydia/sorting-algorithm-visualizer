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
	parentIndex: number;
	leftChildIndex: number;
	rightChildIndex: number;
	unsortedRegionLastIndex: number;
};

export const heapSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		parentIndex: number,
		leftChildIndex: number,
		rightChildIndex: number,
		unsortedRegionLastIndex: number,

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
			frameDescription,
			elementStates,
			parentIndex,
			leftChildIndex,
			rightChildIndex,
			unsortedRegionLastIndex,
		};

		frameStates.push(currFrameState);
	};

	const __heapsort_rebuild = (
		_size: number,
		parentIndex: number,
	): void => {
		generateFrameState(
			`Consider [${parentIndex}] as a parent.`,
			parentIndex,
			-1,
			-1,
			_size - 1,
			() => false,
			() => false,
			() => false,
		);

		while (parentIndex * 2 + 1 < _size) {
			const leftChildIndex: number =
				parentIndex * 2 + 1;
			let targetChildIndex: number =
				leftChildIndex;

			if (leftChildIndex + 1 < _size) {
				generateFrameState(
					`[${parentIndex}] has two children [${leftChildIndex}] and [${
						leftChildIndex + 1
					}].`,
					parentIndex,
					leftChildIndex,
					leftChildIndex + 1,
					_size - 1,
					() => false,
					() => false,
					() => false,
				);

				comparisonCount++;
				generateFrameState(
					`Comparing [${leftChildIndex}] (left child) against [${
						leftChildIndex + 1
					}] (right child).`,
					parentIndex,
					-1,
					-1,
					_size - 1,
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

				comparisonCount++;
				generateFrameState(
					`Comparing [${parentIndex}] against [${targetChildIndex}] (larger child).`,
					-1,
					-1,
					-1,
					_size - 1,
					(k) =>
						k === parentIndex ||
						k === targetChildIndex,
					() => false,
					() => false,
				);
			} else {
				generateFrameState(
					`[${parentIndex}] has one child [${leftChildIndex}].`,
					parentIndex,
					leftChildIndex,
					-1,
					_size - 1,
					() => false,
					() => false,
					() => false,
				);
				comparisonCount++;
				generateFrameState(
					`Comparing [${parentIndex}] against [${targetChildIndex}] (only child).`,
					-1,
					-1,
					-1,
					_size - 1,
					(k) =>
						k === parentIndex ||
						k === targetChildIndex,
					() => false,
					() => false,
				);
			}

			if (
				xs[parentIndex] >= xs[targetChildIndex]
			) {
				generateFrameState(
					`Parent is not smaller. Heap property holds. Do not swap.`,
					parentIndex,
					-1,
					-1,
					_size - 1,
					(k) =>
						k === parentIndex ||
						k === targetChildIndex,
					() => false,
					() => false,
				);
				return;
			}

			generateFrameState(
				`Parent is smaller. Heap property does not hold. Swapping [${parentIndex}] and [${targetChildIndex}].`,
				-1,
				-1,
				-1,
				_size - 1,
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
				`Swapped [${parentIndex}] and [${targetChildIndex}].`,
				-1,
				-1,
				-1,
				_size - 1,
				() => false,
				() => false,
				(k) =>
					k === parentIndex ||
					k === targetChildIndex,
			);

			parentIndex = targetChildIndex;

			generateFrameState(
				`[${targetChildIndex}] has been swapped. Consider it as a parent.`,
				targetChildIndex,
				-1,
				-1,
				_size - 1,
				() => false,
				() => false,
				() => false,
			);
		}

		generateFrameState(
			`[${parentIndex}] do not have a child. Skipping.`,
			parentIndex,
			-1,
			-1,
			_size - 1,
			() => false,
			() => false,
			() => false,
		);
	};

	generateFrameState(
		"Unsorted input.",
		-1,
		-1,
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);

	generateFrameState(
		`Forming initial heap. [${
			size - 1
		}] is the last element of unsorted region.`,
		-1,
		-1,
		-1,
		size - 1,
		() => false,
		() => false,
		() => false,
	);

	for (let i = size - 1; i >= 0; i--) {
		__heapsort_rebuild(size, i);
	}

	generateFrameState(
		"Initial heap is formed. Consider [0] as a root.",
		0,
		-1,
		-1,
		size - 1,
		() => false,
		() => false,
		() => false,
	);

	for (let i = size - 1; i > 0; i--) {
		generateFrameState(
			`Swapping [0] (root) and [${i}] (last element).`,
			0,
			-1,
			-1,
			-1,
			() => false,
			(k) => k === 0 || k === i,
			() => false,
		);

		const temp: number = xs[0];
		xs[0] = xs[i];
		xs[i] = temp;

		swapCount++;
		generateFrameState(
			`Swapped [${0}] with [${i}].`,
			0,
			-1,
			-1,
			-1,
			() => false,
			() => false,
			(k) => k === 0 || k === i,
		);

		generateFrameState(
			`Decrease size of unsorted region by one. [${
				i - 1
			}] is the last element of unsorted region.`,
			-1,
			-1,
			-1,
			i - 1,
			() => false,
			() => false,
			() => false,
		);

		generateFrameState(
			`Rebuild heap.`,
			-1,
			-1,
			-1,
			i - 1,
			() => false,
			() => false,
			() => false,
		);

		__heapsort_rebuild(i, 0);
	}

	generateFrameState(
		"No more root to consider. Sorting complete.",
		-1,
		-1,
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);

	generateFrameState(
		"Sorted input in ascending order.",
		-1,
		-1,
		-1,
		-1,
		() => false,
		() => false,
		() => false,
	);
};
