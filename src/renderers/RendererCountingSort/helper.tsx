type ElementState = {
	value: number;
};

export type FrameState = {
	elementStates: ElementState[];
	frameDescription: string;
};

export const countingSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	const generateFrameState = (
		frameDescription: string,
	): void => {
		const elementStates: ElementState[] = [];
		for (let i = 0; i < xs.length; i++) {
			elementStates[i] = {
				value: xs[i],
			};
		}

		frameStates.push({
			frameDescription,
			elementStates,
		});
	};

	generateFrameState("Unsorted input.");

	const sortedXs: number[] = [];
	const auxiliaryMemory: number[] = [];
	for (let i = 0; i <= Math.max(...xs); i++) {
		auxiliaryMemory[i] = 0;
	}
	for (let i = 0; i <= Math.max(...xs); i++) {
		auxiliaryMemory[xs[i]]++;
	}

	for (let i = 1; i <= Math.max(...xs); i++) {
		auxiliaryMemory[i] += auxiliaryMemory[i - 1];
	}

	for (let i = 0; i < size; i++) {
		sortedXs[auxiliaryMemory[xs[i]]] = xs[i];
		auxiliaryMemory[xs[i]]--;
	}

	for (let i = 0; i < size; i++) {
		generateFrameState("Copy from sorted array");

		xs[i] = sortedXs[i];
	}

	generateFrameState(
		`Sorted input in ascending order.`,
	);
};
