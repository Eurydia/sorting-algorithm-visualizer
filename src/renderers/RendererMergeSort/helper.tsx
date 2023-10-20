export type FrameState = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

export const mergeSort = (
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

	const __top_down_merge_sort = (
		start_index: number,
		end_index: number,
	): void => {
		if (end_index - start_index === 0) {
			return;
		}

		const middle_index: number = Math.floor(
			(start_index + end_index) / 2,
		);

		__top_down_merge_sort(
			start_index,
			middle_index,
		);

		__top_down_merge_sort(
			middle_index + 1,
			end_index,
		);

		let l_ptr: number = start_index;
		let r_ptr: number = middle_index + 1;
		const aux: number[] = [];

		while (
			l_ptr <= middle_index &&
			r_ptr <= end_index
		) {
			comparisonCount++;
			generateFrameState(
				`Comparing [${l_ptr}] against [${r_ptr}]`,
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

		while (l_ptr <= middle_index) {
			aux.push(xs[l_ptr]);
			l_ptr++;
		}

		while (r_ptr <= end_index) {
			aux.push(xs[r_ptr]);
			r_ptr++;
		}

		for (let i = 0; i < aux.length; i++) {
			generateFrameState(
				`Swapping [${
					i + start_index
				}] from auxiliary memory.`,
				() => false,
				(k) => k === i + start_index,
				() => false,
			);

			xs[i + start_index] = aux[i];
			swapCount++;
			generateFrameState(
				`Swapped [${
					i + start_index
				}] from auxiliary memory.`,
				() => false,
				() => false,
				(k) => k === i + start_index,
			);
		}
	};

	generateFrameState(
		"Unsorted input.",
		() => false,
		() => false,
		() => false,
	);

	__top_down_merge_sort(0, xs.length - 1);

	generateFrameState(
		"Sorted input in ascening order.",
		() => false,
		() => false,
		() => false,
	);
};
