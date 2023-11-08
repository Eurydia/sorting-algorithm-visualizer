import { ReactNode, Fragment } from "react";

export type IndexDetails = {
	compared: number[];
	// beingSwapped: number[];
	swapped: number[];
	lastElementOfUnsortedRegion: number[];
	bubbling: number[];
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	swapCount: number;
	comparisonCount: number;
};

export const bubbleSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			elementStates: [...dataset],
			swapCount,
			comparisonCount,
			...indexDetails,
		});
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			lastElementOfUnsortedRegion: [],
			bubbling: [],
			compared: [],
			// beingSwapped: [],
			swapped: [],
		},
	);

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		for (let i = 0; i < size - offset - 1; i++) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{i}]</code> against{" "}
					<code>input[{i + 1}]</code>.
				</Fragment>,
				{
					lastElementOfUnsortedRegion: [
						size - offset - 1,
					],
					bubbling: [i],
					compared: [i, i + 1],
					// beingSwapped: [],
					swapped: [],
				},
			);

			const a = dataset[i];
			const b = dataset[i + 1];
			if (b >= a) {
				continue;
			}

			dataset[i] = b;
			dataset[i + 1] = a;
			swapCount++;

			generateFrameState(
				<Fragment>
					Swapped <code>input[{i}]</code> and{" "}
					<code>input[{i + 1}]</code>.
				</Fragment>,
				{
					lastElementOfUnsortedRegion: [
						size - offset - 1,
					],
					bubbling: [i + 1],
					compared: [],
					// beingSwapped: [],
					swapped: [i, i + 1],
				},
			);
		}
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			lastElementOfUnsortedRegion: [],
			bubbling: [],
			compared: [],
			// beingSwapped: [],
			swapped: [],
		},
	);
};
