import { Fragment, ReactNode } from "react";

type IndexDetails = {
	compared: number[];
	swapped: number[];
	keyElement: number;
	leftMostUnsortedElement: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	swapCount: number;
	comparisonCount: number;
};

export const selectionSort = (
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
			compared: [],
			swapped: [],
			keyElement: -1,
			leftMostUnsortedElement: -1,
		},
	);

	for (let offset = 0; offset < size; offset++) {
		let pivotIndex: number = offset;
		generateFrameState(
			<Fragment>
				Moved key to <code>input[{offset}]</code>.
			</Fragment>,
			{
				compared: [],
				swapped: [],
				keyElement: offset,
				leftMostUnsortedElement: offset,
			},
		);

		for (let i = offset + 1; i < size; i++) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compared{" "}
					<code>input[{pivotIndex}]</code> against{" "}
					<code>input[{i}]</code>.
				</Fragment>,
				{
					compared: [i, pivotIndex],
					swapped: [],
					keyElement: pivotIndex,
					leftMostUnsortedElement: offset,
				},
			);

			if (dataset[pivotIndex] <= dataset[i]) {
				continue;
			}

			pivotIndex = i;

			generateFrameState(
				<Fragment>
					Moved key to <code>input[{i}]</code>.
				</Fragment>,
				{
					compared: [],
					swapped: [],
					keyElement: pivotIndex,
					leftMostUnsortedElement: offset,
				},
			);
		}

		const a: number = dataset[offset];
		const b: number = dataset[pivotIndex];
		dataset[offset] = b;
		dataset[pivotIndex] = a;

		swapCount++;
		generateFrameState(
			<Fragment>
				Swapped key and{" "}
				<code>input[{offset}]</code>.
			</Fragment>,
			{
				compared: [],
				swapped: [offset, pivotIndex],
				keyElement: offset,
				leftMostUnsortedElement: offset,
			},
		);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			compared: [],
			swapped: [],
			leftMostUnsortedElement: -1,
			keyElement: -1,
		},
	);
};
